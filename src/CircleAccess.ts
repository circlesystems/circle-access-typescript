/* eslint-disable @typescript-eslint/explicit-module-boundary-types */
/* eslint-disable @typescript-eslint/no-explicit-any */
import { CircleAccessApi } from './Api'
import { createHmac } from 'crypto'

export class CircleAccess {
  protected _isInitialized: boolean
  protected appKey: string
  protected readKey: string
  protected writeKey: string
  protected _apiInstance = new CircleAccessApi()
  protected _headers = {}

  constructor(appKey: string, readKey: string, writeKey: string) {
    this.appKey = appKey
    this.readKey = readKey
    this.writeKey = writeKey
    this._isInitialized = true
    this._headers = {
      headers: {
        'x-ua-appKey': appKey,
        'Content-Type': 'application/json; charset=utf-8',
      },
    }
  }

  protected buildUrlSearchParamsString(paramsData: any): string {
    if (!paramsData || typeof paramsData !== 'object') {
      throw Error('paramsData must be an object')
    }

    const urlParams = new URLSearchParams()
    for (const propName of Object.getOwnPropertyNames(paramsData)) {
      urlParams.append(propName, paramsData[propName])
    }
    return '?' + urlParams.toString()
  }

  protected generateQueryStringSignature(
    paramsData: any,
    secret: string
  ): string {
    const urlParams = this.buildUrlSearchParamsString(paramsData)
    return this.computeSignature(urlParams, secret)
  }

  protected buildPostParams(paramsData: { [k: string]: any }): any {
    if (!paramsData || typeof paramsData !== 'object') {
      throw Error('paramsData must be an object')
    }
    const params: { [k: string]: any } = {}
    for (const propName of Object.getOwnPropertyNames(paramsData)) {
      params[propName] = paramsData[propName]
    }
    return params
  }

  protected generatePostBody(paramsData: { [k: string]: any }): any {
    const requestData = this.buildPostParams(paramsData)
    const signature = this.computeSignature(
      JSON.stringify(requestData),
      this.writeKey
    )
    return JSON.stringify({
      data: requestData,
      signature: signature,
    })
  }

  protected computeSignature(message: string, secret: string): string {
    const computed = createHmac('sha256', secret)
      .update(message)
      .digest('base64')
    return computed
  }

  protected checkSignature(
    message: string,
    secret: string,
    receivedSignature: string
  ): boolean {
    const computed = this.computeSignature(message, secret)
    return receivedSignature === computed
  }

  protected checkQueryStringSignature(paramsData: any, signature: string) {
    if (!paramsData) {
      throw Error('Unexpected query string params.')
    }

    const urlParams = this.buildUrlSearchParamsString(paramsData)
    if (!this.checkSignature(urlParams, this.readKey, signature)) {
      throw Error('QueryString signature does not match.')
    }
    return true
  }

  protected checkJsonSignature(objData: any) {
    if (!objData || !objData.signature || !objData.data) {
      throw Error('Unexpected return JSON.')
    }

    const stringData = JSON.stringify(objData.data)
    if (!this.checkSignature(stringData, this.readKey, objData.signature)) {
      throw Error('Data signature does not match.')
    }
  }

  protected validateInitialized(): boolean {
    if (!this._isInitialized) {
      throw Error(
        'You must first use the constructor to generate an new instance with the correct parameters before calling API functions.'
      )
    }
    return true
  }

  protected validateLoginCallbackSignature(
    userID: string,
    sessionID: string,
    authID: string,
    type: string,
    signature: string
  ): boolean {
    this.validateInitialized()
    return this.checkQueryStringSignature(
      { userID, sessionID, authID, type },
      signature
    )
  }

  protected validate2FACallbackSignature(
    userID: string,
    sessionID: string,
    authID: string,
    type: string,
    customID: string,
    signature: string
  ): boolean {
    this.validateInitialized()
    return this.checkQueryStringSignature(
      { userID, sessionID, authID, type, customID },
      signature
    )
  }

  /**
   * Create an authorization contract, you can track all the parties and their responses.
   * The sum of all weights must be 100. If required, and the user denies, the whole contract is rejected
   * For example: Create an authorization to spin 10 more VMs, this authorization needs 2 people to authorize
   * You create the contract with 1 email and 1 phone number (you can test one or other per approval)
   * The weight of each will be 50, so both need to approve
   * 1 is required = if he disapproves, the whole contract is rejected
   * if he accepts, the other party still needs to accept so the contract is fulfilled
   *
   * Scan the factor URL (response) using Circle Access Mobile App (light - webapp version does not work)
   * @tags Circle Access
   * @name createAuthorization
   * @summary Create an authorization contract
   */
  async createAuthorization(
    customID: string,
    returnUrl: string,
    question: string,
    approvals: {
      email?: string
      weight?: number
      required?: boolean
      phone?: string
    }[],
    webhookUrl?: string
  ): Promise<any> {
    try {
      this.validateInitialized()
      const body = this.generatePostBody({
        customID,
        question,
        returnUrl,
        approvals,
        webhookUrl,
      })
      const returnValue =
        await this._apiInstance.authorization.createAuthorization(
          body,
          this._headers
        )
      this.checkJsonSignature(returnValue)
      return returnValue
    } catch (error) {
      console.log(error)
      throw error
    }
  }

  /**
   * Get the Authorization contract bacl
   *
   * @tags Circle Access
   * @name getAuthorization
   * @summary Get Contract back
   */
  async getAuthorization(authID: string): Promise<any> {
    try {
      this.validateInitialized()
      const generatedSignature = this.generateQueryStringSignature(
        { authID: authID },
        this.writeKey
      )
      const returnValue =
        await this._apiInstance.authorization.getAuthorization(
          { authID: authID, signature: generatedSignature },
          this._headers
        )
      return returnValue
    } catch (error) {
      console.log(error)
      throw error
    }
  }

  /**
   * Create a 2FA, you can create factor authentication for any email or phone number, the user will only be able to respond if the owns the email/phone number
   *
   * Scan the factor URL (response) using Circle Access Mobile App (light - webapp version does not work)
   * @tags Circle Access
   * @name create2FA
   * @summary Create a 2FA for any email or phone
   */
  async create2FA(
    customID: string,
    returnUrl: string,
    question: string,
    phone?: string,
    email?: string,
    userID?: string,
    webhookUrl?: string,
    mobileReturnUrl?: string
  ): Promise<any> {
    try {
      this.validateInitialized()

      const body = this.generatePostBody({
        customID,
        returnUrl,
        webhookUrl,
        phone,
        email,
        question,
        userID,
        mobileReturnUrl,
      })
      const returnValue = await this._apiInstance.v2Fa.create2Fa(
        body,
        this._headers
      )
      this.checkJsonSignature(returnValue)
      return returnValue
    } catch (error) {
      console.log(error)
      throw error
    }
  }

  /**
   * Get the session data if available for you appKey
   * Returns among others: the userHashedEmails [string] and a jwt containing the user ID
   *
   * @tags Circle Access
   * @name getSession
   * @summary Get Session data
   */
  async getSession(sessionID: string): Promise<any> {
    try {
      this.validateInitialized()
      const generatedSignature = this.generateQueryStringSignature(
        { s: sessionID },
        this.writeKey
      )
      const returnValue = await this._apiInstance.session.getSession(
        { s: sessionID, signature: generatedSignature },
        this._headers
      )
      this.checkJsonSignature(returnValue)
      return returnValue
    } catch (error) {
      console.log(error)
      throw error
    }
  }

  /**
   * no signature validation - please use getSession
   * Useful while debugging only
   *
   * @tags Circle Access
   * @name getSession
   * @summary Get Session data
   */
  async getRawSession(sessionID: string): Promise<any> {
    try {
      this.validateInitialized()
      const generatedSignature = this.generateQueryStringSignature(
        { s: sessionID },
        this.writeKey
      )
      const returnValue = await this._apiInstance.session.getSession(
        { s: sessionID, signature: generatedSignature },
        this._headers
      )
      return returnValue
    } catch (error) {
      console.log(error)
      throw error
    }
  }

  /**
   * Get the user's session - this method is to used for session control as it is lightining fast
   *
   * @tags Circle Access
   * @name getUserSession
   * @summary Get User Session
   */
  async getUserSession(sessionID: string, userID: string): Promise<any> {
    try {
      this.validateInitialized()
      const generatedSignature = this.generateQueryStringSignature(
        { sessionID, userID },
        this.writeKey
      )
      const returnValue = await this._apiInstance.users.getUserSession(
        { sessionID: sessionID, userID: userID, signature: generatedSignature },
        this._headers
      )
      this.checkJsonSignature(returnValue)
      return returnValue
    } catch (error) {
      console.log(error)
      throw error
    }
  }

  /**
   * no signature validation - prefer to use the expireUserSession()
   *
   * @tags Circle Access
   * @name expireRawUserSession
   * @summary Expire tje User Session
   */
  async expireRawUserSession(sessionID: string, userID: string): Promise<any> {
    try {
      this.validateInitialized()
      const body = this.generatePostBody({ sessionID, userID })
      const returnValue = await this._apiInstance.users.expireUserSession(
        body,
        this._headers
      )
      return returnValue
    } catch (error) {
      console.log(error)
      throw error
    }
  }

  /**
   * Expires the user session (needed to avoid replay attacks when using our session control)
   *
   * @tags Circle Access
   * @name expireUserSession
   * @summary Expire the User Session
   */
  async expireUserSession(sessionID: string, userID: string): Promise<any> {
    try {
      this.validateInitialized()
      const body = this.generatePostBody({ sessionID, userID })
      const returnValue = await this._apiInstance.users.expireUserSession(
        body,
        this._headers
      )
      this.checkJsonSignature(returnValue)
      return returnValue
    } catch (error) {
      console.log(error)
      throw error
    }
  }
}

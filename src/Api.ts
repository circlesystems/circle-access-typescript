/* eslint-disable */
/* tslint:disable */
/*
 * ---------------------------------------------------------------
 * ## THIS FILE WAS GENERATED VIA SWAGGER-TYPESCRIPT-API        ##
 * ##                                                           ##
 * ## AUTHOR: acacode                                           ##
 * ## SOURCE: https://github.com/acacode/swagger-typescript-api ##
 * ---------------------------------------------------------------
 */

/**
 * @example null
 */
export interface CreateAuthorizationRequest {
  data: AuthorizationRequestData;

  /** This signature can be obtained by getting the content from the `data` then generate a `HMAC SHA256 Base64` encoded data. Please check the [Signature](#section/Signature) section. */
  signature: string;
}

/**
 * @example null
 */
export interface AuthorizationRequestData {
  /**
   * The return URL that will be used for redirection when the 2FA is accepted.
   * @pattern /^(http|https):///i
   */
  returnUrl: string;

  /** This is the question you will make to the user. Example: `Confirm 1 BTC withdrawal?` */
  question: string;

  /**
   * The customID parameter can be anything to track back to your system. Example: `session-123`
   * @pattern /^[a-zA-Z0-9 _-]+$/i
   */
  customID: string;

  /**
   * Webhook URL to send data when authorization is accepted.
   * @pattern /^(http|https):///i
   */
  webhookUrl?: string;
  approvals?: { email?: string; weight?: number; required?: boolean; phone?: string }[];
}

/**
 * @example null
 */
export interface Create2FARequest {
  data: Type2FARequestData;

  /** This signature can be obtained by getting the content from the `data` then generate a `HMAC SHA256 Base64` encoded data. Please check the [Signature](#section/Signature) section. */
  signature: string;
}

/**
 * @example null
 */
export interface Type2FARequestData {
  /**
   * The customID parameter can be anything to track back to your system. Example: `session-123`
   * @pattern /^[a-zA-Z0-9 _-]+$/i
   */
  customID: string;

  /**
   * The return URL that will be used for redirection when the 2FA is accepted.
   * @pattern /^(http|https):///i
   */
  returnUrl: string;

  /**
   * Webhook URL to send data when 2FA is accepted. Check out [2FA Webhook](#operation/2FAWebhook) for request specification.
   * @pattern /^(http|https):///i
   */
  webhookUrl?: string;

  /**
   * The phone number that you want the acceptance of the question. <br>Must start with `+` (plus sign) and the country code. <br>You cannot send the `email` and the `phone`, you have to send one or another.
   * @pattern /^[+][0-9]{10,16}/i
   * @example +19998887777
   */
  phone?: string;

  /**
   * The e-mail address that you want the acceptance of the question. <br>You cannot send the `email` and the `phone`, you have to send one or another.
   * @pattern /^[^\s@]+@[^\s@]+\.[^\s@]+$/i
   */
  email?: string;

  /** This is the question you will make to the user. Example: `Confirm 1 BTC withdrawal?` */
  question: string;

  /** The userID that you want the acceptance of the question. <br>If the user that scans the code is not the same as this `userID`, he will not be able to accept your question. <br>You don't need this parameter if you use the `email` or `phone`. But if you add this parameter, both checks (`userID` plus `email`/`phone`) will happen. */
  userID?: string;

  /** This URL, with the [same parameters](#operation/2FAWebhook) as the `returnUrl` or `webhookUrl`, will be triggered by the user's app after his factor acceptance. This is usually done when making an app-to-app call. You can use, for example, `your_app://path` (Deep Link). */
  mobileReturnUrl?: string;
}

/**
 * @example null
 */
export interface Create2FAResponse {
  data: Type2FAResponseData;

  /** This signature can be obtained by getting the content from `data` as a not formatted string then generate a `HMAC SHA256 Base64` encoded data. To see some example e more explanations, please check the [Signature](#section/Signature) section. */
  signature: string;
}

/**
 * @example null
 */
export interface Type2FAResponseData {
  /**
   * The URL that will open Circle Access website or the app to request the user acceptance. Check [Factor Authentication](#section/FactorAuthentication)). acceptance.
   * @pattern /^(http|https):///i
   */
  factorUrl: string;

  /**
   * The customID parameter can be anything to track back to your system. Example: `session-123`
   * @pattern /^[a-zA-Z0-9 _-]+$/i
   */
  customID: string;

  /**
   * The return URL that will be used for redirection when the 2FA is accepted.
   * @pattern /^(http|https):///i
   */
  returnUrl: string;

  /**
   * Webhook URL to send data when 2FA is accepted. Check out [2FA Webhook](#operation/2FAWebhook) for request specification.
   * @pattern /^(http|https):///i
   */
  webhookUrl?: string;

  /**
   * The phone number that you want the acceptance of the question. <br>Must start with `+` (plus sign) and the country code. <br>You cannot send the `email` and the `phone`, you have to send one or another.
   * @pattern /^[+][0-9]{10,16}/i
   * @example +19998887777
   */
  phone?: string;

  /**
   * The e-mail address that you want the acceptance of the question. <br>You cannot send the `email` and the `phone`, you have to send one or another.
   * @pattern /^[^\s@]+@[^\s@]+\.[^\s@]+$/i
   */
  email?: string;

  /** This is the question you will make to the user. Example: `Confirm 1 BTC withdrawal?` */
  question?: string;

  /** The userID that you want the acceptance of the question. <br>If the user that scans the code is not the same as this `userID`, he will not be able to accept your question. <br>You don't need this parameter if you use the `email` or `phone`. But if you add this parameter, both checks (`userID` plus `email`/`phone`) will happen. */
  userID?: string;

  /** This URL, with the [same parameters](#operation/2FAWebhook) as the `returnUrl` or `webhookUrl`, will be triggered by the user's app after his factor acceptance. This is usually done when making an app-to-app call. You can use, for example, `your_app://path` (Deep Link). */
  mobileReturnUrl?: string;

  /** Array of approval objects - ONLY available for authorization */
  approvals?: ApprovalObject;
}

/**
 * Array of approval objects - ONLY available for authorization
 */
export type ApprovalObject = { email?: string; weight?: number; required?: boolean; phone?: string }[];

export interface GetSessionResponse {
  data: GetSessionResponseData;

  /** This signature can be obtained by getting the content from `data` as a not formatted string then generate a `HMAC SHA256 Base64` encoded data. To see some example e more explanations, please check the [Signature](#section/Signature) section. */
  signature: string;
}

export interface GetSessionResponseData {
  authID: string;
  miliUnixtime: number;
  returnUrl: string;
  sessionID: string;
  type: "login" | "twoFactor";
  userID: string;
}

export interface GetUserSessionResponse {
  data: GetUserSessionResponseData;

  /** This signature can be obtained by getting the content from `data` as a not formatted string then generate a `HMAC SHA256 Base64` encoded data. To see some example e more explanations, please check the [Signature](#section/Signature) section. */
  signature: string;
}

export interface GetUserSessionResponseData {
  sessionID: string;
  userID: string;

  /** Unixtime in milliseconds */
  startAt: number;

  /**
   * `usedOnce` will return only for the first [Factor Authentication](#section/Factor-Authentication), after that the session will automatically expire.
   *
   */
  status: "active" | "usedOnce" | "expired";

  /** Unixtime in milliseconds. Only sent when the `status` value is `expired`. */
  expiredAt?: number;

  /** The jwt created for the session. */
  jwt: string;
}

/**
 * @example null
 */
export interface ExpireUserSessionRequest {
  data: ExpireUserSessionRequestData;

  /** This signature can be obtained by getting the content from the `data` then generate a `HMAC SHA256 Base64` encoded data. Please check the [Signature](#section/Signature) section. */
  signature: string;
}

/**
 * @example null
 */
export interface ExpireUserSessionRequestData {
  /** `sessionID` to expire. This information comes from the [Login Authentication Return](#section/Login-Authentication) and [Factor Authentication Return](#section/Factor-Authentication). */
  sessionID: string;

  /** `userID` that is using the `sessionID`. This information comes from the [Login Authentication Return](#section/Login-Authentication) and [Factor Authentication Return](#section/Factor-Authentication). */
  userID: string;
}

export interface ExpireUserSessionResponse {
  data: ExpireUserSessionResponseData;

  /** This signature can be obtained by getting the content from `data` as a not formatted string then generate a `HMAC SHA256 Base64` encoded data. To see some example e more explanations, please check the [Signature](#section/Signature) section. */
  signature: string;
}

export interface ExpireUserSessionResponseData {
  processed: boolean;
  sessionID: string;
  userID: string;
  status: "expired";

  /** Unixtime in milliseconds */
  expiredAt: number;
}

/**
 * @example {"error":"Some error description"}
 */
export interface ResponseError {
  /** Error description. */
  error?: string;
}

import axios, { AxiosInstance, AxiosRequestConfig, AxiosResponse, HeadersDefaults, ResponseType } from "axios";

export type QueryParamsType = Record<string | number, any>;

export interface FullRequestParams extends Omit<AxiosRequestConfig, "data" | "params" | "url" | "responseType"> {
  /** set parameter to `true` for call `securityWorker` for this request */
  secure?: boolean;
  /** request path */
  path: string;
  /** content type of request body */
  type?: ContentType;
  /** query params */
  query?: QueryParamsType;
  /** format of response (i.e. response.json() -> format: "json") */
  format?: ResponseType;
  /** request body */
  body?: unknown;
}

export type RequestParams = Omit<FullRequestParams, "body" | "method" | "query" | "path">;

export interface ApiConfig<SecurityDataType = unknown> extends Omit<AxiosRequestConfig, "data" | "cancelToken"> {
  securityWorker?: (
    securityData: SecurityDataType | null,
  ) => Promise<AxiosRequestConfig | void> | AxiosRequestConfig | void;
  secure?: boolean;
  format?: ResponseType;
}

export enum ContentType {
  Json = "application/json",
  FormData = "multipart/form-data",
  UrlEncoded = "application/x-www-form-urlencoded",
}

export class HttpClient<SecurityDataType = unknown> {
  public instance: AxiosInstance;
  private securityData: SecurityDataType | null = null;
  private securityWorker?: ApiConfig<SecurityDataType>["securityWorker"];
  private secure?: boolean;
  private format?: ResponseType;

  constructor({ securityWorker, secure, format, ...axiosConfig }: ApiConfig<SecurityDataType> = {}) {
    this.instance = axios.create({
      ...axiosConfig,
      baseURL: axiosConfig.baseURL || "https://circleauth.gocircle.ai/api",
    });
    this.secure = secure;
    this.format = format;
    this.securityWorker = securityWorker;
  }

  public setSecurityData = (data: SecurityDataType | null) => {
    this.securityData = data;
  };

  protected mergeRequestParams(params1: AxiosRequestConfig, params2?: AxiosRequestConfig): AxiosRequestConfig {
    const method = params1.method || (params2 && params2.method);

    return {
      ...this.instance.defaults,
      ...params1,
      ...(params2 || {}),
      headers: {
        ...((method && this.instance.defaults.headers[method.toLowerCase() as keyof HeadersDefaults]) || {}),
        ...(params1.headers || {}),
        ...((params2 && params2.headers) || {}),
      },
    };
  }

  protected stringifyFormItem(formItem: unknown) {
    if (typeof formItem === "object" && formItem !== null) {
      return JSON.stringify(formItem);
    } else {
      return `${formItem}`;
    }
  }

  protected createFormData(input: Record<string, unknown>): FormData {
    return Object.keys(input || {}).reduce((formData, key) => {
      const property = input[key];
      const propertyContent: Iterable<any> = property instanceof Array ? property : [property];

      for (const formItem of propertyContent) {
        const isFileType = formItem instanceof Blob || formItem instanceof File;
        formData.append(key, isFileType ? formItem : this.stringifyFormItem(formItem));
      }

      return formData;
    }, new FormData());
    return Object.keys(input || {}).reduce((formData, key) => {
      const property = input[key];
      formData.append(
        key,
        property instanceof Blob
          ? property
          : typeof property === "object" && property !== null
          ? JSON.stringify(property)
          : `${property}`,
      );
      return formData;
    }, new FormData());
  }

  public request = async <T = any, _E = any>({
    secure,
    path,
    type,
    query,
    format,
    body,
    ...params
  }: FullRequestParams): Promise<AxiosResponse<T>> => {
    const secureParams =
      ((typeof secure === "boolean" ? secure : this.secure) &&
        this.securityWorker &&
        (await this.securityWorker(this.securityData))) ||
      {};
    const requestParams = this.mergeRequestParams(params, secureParams);
    const responseFormat = format || this.format || undefined;

    if (type === ContentType.FormData && body && body !== null && typeof body === "object") {
      body = this.createFormData(body as Record<string, unknown>);
    }

    const response = await this.instance.request({
      ...requestParams,
      headers: {
        ...(type && type !== ContentType.FormData ? { "Content-Type": type } : {}),
        ...(requestParams.headers || {}),
      },
      params: query,
      responseType: responseFormat,
      data: body,
      url: path,
    });

    return response.data;
  };
}

export class CircleAccessApi<SecurityDataType extends unknown> extends HttpClient<SecurityDataType> {
  authorization = {
    /**
     * @description This endpoint creates an authorization contract that can be used for authorizating any type of request.
     *
     * @tags Circle Access API
     * @name CreateAuthorization
     * @summary Create Authorization
     * @request POST:/authorization/create/
     */
    createAuthorization: (data: CreateAuthorizationRequest, params: RequestParams = {}) =>
      this.request<Create2FAResponse, ResponseError>({
        path: `/authorization/create/`,
        method: "POST",
        body: data,
        type: ContentType.Json,
        format: "json",
        ...params,
      }),
    
    /**
     * No description
     *
     * @tags Circle Access API
     * @name getAuthorization
     * @summary Get Authorization Contract
     * @request GET:/authorization/get/
     */
     getAuthorization: (query: { authID: string; signature: string }, params: RequestParams = {}) =>
     this.request<Create2FAResponse, ResponseError>({
       path: `/authorization/get/`,
       method: "GET",
       query: query,
       format: "json",
       ...params,
     }),
  };
  v2Fa = {
    /**
     * @description This endpoint creates a new factor authorization URL.
     *
     * @tags Circle Access API
     * @name Create2Fa
     * @summary Create 2FA
     * @request POST:/2fa/create/
     */
    create2Fa: (data: Create2FARequest, params: RequestParams = {}) =>
      this.request<Create2FAResponse, ResponseError>({
        path: `/2fa/create/`,
        method: "POST",
        body: data,
        type: ContentType.Json,
        format: "json",
        ...params,
      }),
  };
  session = {
    /**
     * No description
     *
     * @tags Circle Access API
     * @name GetSession
     * @summary Get Session
     * @request GET:/session/
     */
    getSession: (query: { s: string; signature: string }, params: RequestParams = {}) =>
      this.request<GetSessionResponse, ResponseError>({
        path: `/session/`,
        method: "GET",
        query: query,
        format: "json",
        ...params,
      }),
  };
  users = {
    /**
     * No description
     *
     * @tags Circle Access API
     * @name GetUserSession
     * @summary Get User Session
     * @request GET:user/session
     */
    getUserSession: (query: { sessionID: string; userID: string; signature: string }, params: RequestParams = {}) =>
      this.request<GetUserSessionResponse, ResponseError>({
        path: `user/session`,
        method: "GET",
        query: query,
        format: "json",
        ...params,
      }),

    /**
     * No description
     *
     * @tags Circle Access API
     * @name ExpireUserSession
     * @summary Expire User Session
     * @request POST:user/session/expire
     */
    expireUserSession: (data: ExpireUserSessionRequest, params: RequestParams = {}) =>
      this.request<ExpireUserSessionResponse, ResponseError>({
        path: `user/session/expire`,
        method: "POST",
        body: data,
        type: ContentType.Json,
        format: "json",
        ...params,
      }),
  };
}

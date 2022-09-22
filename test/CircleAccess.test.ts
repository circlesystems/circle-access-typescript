import { CircleAccess } from '../src/index'

const ca = new CircleAccess(
  'app9KrRWQS9DjtpzNgWcbHNt68S7Y1DfUJJV',
  'readFk4HtTqLNcTZYZzmHUNfT3jjt1EwqYRu3',
  'writeNRZpXhseVhV3pk1mrw7rxvEJLa4AXwzzH')

const ca2FA = new CircleAccess(
  'appCyrtwqdNTyF6Q5LnfHos8umxCpCXLYJgw',
  'readDjgJGqqAdZVFuA5ZAVsFC5NsqpsfdFEWy',
  'writeEycPMY3AXw9ZcdwBxDdwGqDEaTZHmwgBX')

test('getSession', async () => {
  const session = await ca.getSession("session2YHiFKTTAwuvfL7kWMKRzzeVjNxMiwEbC");
  expect(session.data.authID).toBe('authGzJHv5ttEjHumAB9YkgNBmyc7APkm9qKd')
})

test('getRawSession', async () => {
  const session = await ca.getRawSession("session2YHiFKTTAwuvfL7kWMKRzzeVjNxMiwEbC");
  expect(session.data.authID).toBe('authGzJHv5ttEjHumAB9YkgNBmyc7APkm9qKd')
})

test('expireUserSession', async () => {
  const userSession = await ca.expireUserSession("session2YHiFKTTAwuvfL7kWMKRzzeVjNxMiwEbC", "d8b544c23224efad0541c84131bf099be84f44c05311e363b2609c80cfcc676e");
  console.log(userSession)
  expect(userSession.data.userID).toBe('d8b544c23224efad0541c84131bf099be84f44c05311e363b2609c80cfcc676e')
})

test('expireRawUserSession', async () => {
  const userSession = await ca.expireRawUserSession("session2YHiFKTTAwuvfL7kWMKRzzeVjNxMiwEbC", "d8b544c23224efad0541c84131bf099be84f44c05311e363b2609c80cfcc676e");
  console.log(userSession)
  expect(userSession.data.userID).toBe('d8b544c23224efad0541c84131bf099be84f44c05311e363b2609c80cfcc676e')
})

test('getUserSession', async () => {
  const userSession = await ca.getUserSession("session2YHiFKTTAwuvfL7kWMKRzzeVjNxMiwEbC", "d8b544c23224efad0541c84131bf099be84f44c05311e363b2609c80cfcc676e");
  console.log(userSession)
  expect(userSession.data.userID).toBe('d8b544c23224efad0541c84131bf099be84f44c05311e363b2609c80cfcc676e')
})

test('createAuthorization', async () => {
  const authorization = await ca2FA.createAuthorization('123', 'http://localhost:8000/callback', 'Is curcio@gocircle.ai your email', [
    {
      'email': 'curcio@gocircle.ai',
      'weight': 100,
      'required': false
    },
  ],
    'http://localhost:8001/webhook'
  )
  console.log(authorization)
  expect(authorization.data.customID).toBe('123')
})

test('getAuthorization', async () => {
  const contract = await ca2FA.getAuthorization('authJWFu3gipJukQtQUWSWU')
  console.log(contract)
  expect(contract.data.authID).toBe('authJWFu3gipJukQtQUWSWU')
})

test('create2FA', async () => {
  const authorization = await ca2FA.create2FA('1234', 'http://localhost:8000/callback', 'Is curcio@gocircle.ai your email', '', 'curcio@gocircle.ai', '', '', '')
  console.log(authorization)
  expect(authorization.data.customID).toBe('1234')
})
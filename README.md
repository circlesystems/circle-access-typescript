# Circle Access

Circle Access - Node.js typescript client for [Circle Access API](https://circleauth.gocircle.ai/docs/)
<br>

Circle Access allows you to quickly implement userless/passwordless login and 2FA (no more paying for SMS to have 2FA)

## Installation

First make sure to get your credentials on [Circle Access Console](https://console.gocircle.ai/), if you want to test first, use [Circle Access- Demo](https://circleauth.gocircle.ai/demo)

### For [Node.js](https://nodejs.org/)

#### npm

Install it via:

```shell
npm install circle-access --save
```

## Getting Started

Please follow the [installation](#installation) instruction and execute the following JS code:

```javascript
import { CircleAccess } from 'circle-access'

CircleAccess.configure({
  appKey: APPLICATION_APPKEY,
  readKey: APPLICATION_READKEY,
  writeKey: APPLICATION_WRITEKEY,
})
try {
  let data = await CircleAccess.create2FA(customID, returnUrl, webhookUrl, phone, email, question, userID, mobileReturnUrl)
  console.log('API called successfully. Returned data: ' + data);
} catch (error) {
  console.error(error);
}
```

## Documentation

* CircleAccess.configure(config)
* CircleAccess.create2FA(customID, returnUrl, webhookUrl, phone, email, question, userID, mobileReturnUrl)
* CircleAccess.getSession(sessionID)
* CircleAccess.getUserSession(sessionID, userID)
* CircleAccess.expireUserSession(sessionID, userID)

## Distribuition

1.  Update package `version` at `package.json`.
2.  Open terminal and run `npm publish`.
3.  Visit https://www.npmjs.com/package/circle-access to check latest version.
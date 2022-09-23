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

const ca = new CircleAccess(
  'app9KrRWQS9DjtpzNgWcbHNt68S7Y1DfUJJV',
  'readFk4HtTqLNcTZYZzmHUNfT3jjt1EwqYRu3',
  'writeNRZpXhseVhV3pk1mrw7rxvEJLa4AXwzzH')

try {
  const session = await ca.getSession("session2YHiFKTTAwuvfL7kWMKRzzeVjNxMiwEbC");
  console.log('API called successfully. Returned data: ');
  console.log(session);
} catch (error) {
  console.error(error);
}
```

## Documentation

Check the test folder to see ALL calls that are available

## Distribuition

1.  Update package `version` at `package.json`.
2.  Open terminal and run `npm publish`.
3.  Visit https://www.npmjs.com/package/circle-access to check latest version.
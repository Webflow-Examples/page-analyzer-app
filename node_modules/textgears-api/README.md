# Textgears API for javascript [![travis-badge]][travis]

> [Textgears][textgears] API for node.js

## install

install the [package] with `npm`:

```sh
$ npm install textgears-api
```

or with `yarn`:

```sh
$ yarn add textgears-api
```

## usage

```js
import * as textgears from 'textgears-api';

const textgearsApi = textgears('YOUR_KEY', {language: 'en-US', ai: false});
textgearsApi.checkGrammar('I is a engineer')
    .then((data) => {
        for (const error of data.response.errors) {
            console.log('Error: %s. Suggestions: %s', error.bad, error.better.join(', '));
        }
    })
    .catch((err) => {});

```

You can run tests with command
```
npm test
```
which is an alias for
```
nyc mocha
```
or
```
./node_modules/nyc/bin/nyc.js ./node_modules/mocha/bin/mocha
```

[textgears]: https://textgears.com/
[package]: https://www.npmjs.com/package/textgears-api
[api]: https://textgears.com/api/
[travis]: https://travis-ci.org/insbrook/textgears-api-node
[travis-badge]: https://travis-ci.org/insbrook/textgears-api-node.svg?branch=master
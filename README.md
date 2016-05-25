# express-formparse
An [Express](http://expressjs.com) middleware that uses [Formidable](https://github.com/felixge/node-formidable) to parse incoming multi-part forms.

## What are Express, Formidable, and this?

[Express](http://expressjs.com) is a fast, unopinionated, minimalist web
framework for Node.js.

[Formidable](https://github.com/felixge/node-formidable) is a Node.js module
for parsing form data, especially file uploads.

So, **`express-formparse`** is something like a bridge between them,
specifically an Express middleware implementation of Formidable.

## Install

```
npm install express-formparse
```

## How

```js
var express = require('express');
var formparse = require('express-formparse');

var app = express();

app.use(formparse.parse({
    encoding: 'utf8',
    uploadDir: 'tmp_upload',
    keepExtensions: true,
    hash: 'md5',
    multiples: true,
    matching: [
        /^(?:\/api\/.+)/,
        '/user/profile/picture'
    ]
}));

app.post('/upload', function (req, res) {
  // req.body will contain the parsed form
});
```

```js
formparse.parse([options])
```
The keys and values in options will be directly passed to the formidable IncomingForm. (See [node-formidable API](https://github.com/felixge/node-formidable#api) for reference) Options may also contain one key 'matching' which is an array with either Strings or RegExps that has to match the incoming forms request path.


**Only requests having a `multipart/form-data` content-type will be parsed.**

## License

[MIT](LICENSE)

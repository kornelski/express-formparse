# express-formparse7

An [Express](http://expressjs.com) middleware that uses [Formidable](https://github.com/felixge/node-formidable) to parse incoming multi-part forms.

## What are Express, Formidable, and this?

[Express](http://expressjs.com) is a fast, unopinionated, minimalist web
framework for Node.js.

[Formidable](https://github.com/felixge/node-formidable) is a Node.js module
for parsing form data, especially file uploads.

So, **`express-formparse`** is something like a bridge between them,
specifically an Express middleware implementation of Formidable.

## Install

```sh
npm i -S express-formparse7
```

## How

```js
const express = require('express');
const formparse = require('express-formparse');

const app = express();

app.use(formparse.parse({
    encoding: 'utf8',
    uploadDir: 'tmp_upload',
    keepExtensions: true,
    hash: 'md5',
    multiples: true,
}));

app.post('/upload', (req, res) => {
  // req.body will contain the parsed form
  // req.files will contain file metadata
});
```

```js
formparse.parse([options])
```
The keys and values in options will be directly passed to the formidable IncomingForm. (See [node-formidable API](https://github.com/felixge/node-formidable#api) for reference).


**Only requests having a `multipart/form-data` content-type will be parsed.**

## License

[MIT](LICENSE)

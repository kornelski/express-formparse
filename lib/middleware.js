var formidable = require('formidable');

/* This method returns a middleware function for parsing multi-part
** forms. The options are formidable options plus a list 'matching'
** of which will be a list of either regexps or strings that the request
** path has to match to prevent files from being uploaded everywhere. */
exports.parse = function( options ) {
    // If no options are defined, we will just set options to an empty object.
    if (options === undefined) { options = { }; }

    // Return the middleware function.
    return function(req, res, next) {
        // We have to make sure the request is of content-type multipart form.
        var contentType = req.headers['content-type'];
        if (!/^multipart\/form-data\b/.test(contentType)) {
            return next();
        }

        // We are going to parse the form.
        var form = new formidable.IncomingForm();

        // Add the passed options to formidable.
        Object.keys(options).forEach(function(key) {
            form[key] = options[key];
        });

        // This will hold all the fields that was recieved in the form.
        var fields = {};
        var files = {};

        // Add data to fields.
        var setOrAppend = function(fields, key, value) {
            if (fields[key] === undefined) {
                // Data has not yet been added to this key, will add now.
                fields[key] = value;
            } else {
                // The key already exists, we will therefore add the data to the already existing key instead of creating a new key.
                if (!(fields[key] instanceof Array)) {
                    // The field is not an array and we will therefore make it into an array with the current value in it.
                    fields[key] = [ fields[key] ];
                }

                // Append the value to the array of key.
                fields[key].push(value);
            }
        };

        // Setup the event listeners for the formidable form.
        form.on('field', function(key, value) {
                setOrAppend(fields, key, value);
            })
            .on('file', function(key, value) {
                setOrAppend(fields, key, value);
                setOrAppend(files, key, value);
            })
            .on('error', next)
            .on('end', function() {
                // The form is done parsing and we will add the fields to the request object and then continue to the next middleware.
                req.body = fields;
                req.files = files;
                next();
            });

        // Start parsing the incoming form.
        form.parse(req);
    };
};

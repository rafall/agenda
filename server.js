var app = require('./server/routes');
var fs = require('fs');
var https = require('https');

var secureServer = https.createServer( {
    key: fs.readFileSync('keys/private.key'),
    cert: fs.readFileSync('keys/certificate.pem')
}, app);

secureServer.listen(3443, function() {
    console.log('Secure server listening on port 3443');
});
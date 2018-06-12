var express         = require('express');
var app             = express();
var bodyParser      = require('body-parser');

var router = require('./routes/routes.js')
var authUser;

var port = '3000';
app.listen(port, function() {
    console.log('Express server listening on %d, in %s mode', port, app.get('env'));
});

app.use(bodyParser.urlencoded({ limit: '50mb', 'extended': 'true' })); // parse application/x-www-form-urlencoded
app.use(bodyParser.json({ limit: '50mb' })); // parse application/json
app.use(bodyParser.json({ limit: '50mb', type: 'application/vnd.api+json' }));
app.use('/', router);
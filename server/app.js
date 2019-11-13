'use strict';
var express = require('express');
var mongoose = require('mongoose');
var compression = require('compression');
var bodyParser = require('body-parser');
var methodOverride = require('method-override');
var config = require('./config');
var _ = require('lodash');

// Connect to DB
mongoose.Promise = require('bluebird');
var options = {
  useNewUrlParser: true,  
  useUnifiedTopology: true,  
  poolSize: 5,
  keepAlive: 30000
  //user: 'myUserName',
  //pass: 'myPassword'  
}
mongoose.connect(config.mongo.connectionstring, options);

// enable mongo logging for dev
if (config.env === 'dev') {
  mongoose.set('debug', true);
}

// Setup server
var protocol = config.protocol;
var app = express();
var server;

if (protocol === 'https') {
    //todo: add credentials - private key and cert for https server
    server = require('https').createServer(app);
} else {
    server = require('http').createServer(app);
}

// config CORS
app.use(function(req, res, next) {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Methods","POST, GET, PUT, DELETE");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept, Authorization");
    next();
});

// bypass cors for development
if (config.env === 'dev') {
    app.use(function (req, res, next) {
        // intercept OPTIONS method
        if (req.method == 'OPTIONS') {
            res.sendStatus(200);
        }
        else {
            next();
        }
    });
}

console.log('Using node ver =>', process.version);

//config express and routing
app.use(compression());
app.use(bodyParser.urlencoded({extended: true}));
app.use(bodyParser.json());
app.use(methodOverride());
require('./routes')(app);

//config launch mode
var server = null;
if (_.isUndefined(process.env.PORT)) {
    //launch in node
    server = app.listen(config.port, config.host, function () {
        var host = server.address().address;
        var port = server.address().port;
        console.log('Express Server listening at %s://%s:%s in %s mode', protocol, host, port, app.get('env'))
    });
} else {
    //launch in IIS
    server = app.listen(process.env.PORT, function () {
        console.log('Express Server running in IIS in %s mode', app.get('env'))
    });
}

// Expose app
exports = module.exports = app;

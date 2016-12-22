var config = require('./config.global');

//todo: add credentials - private key and cert for https server

config.env = "production";
config.protocol = 'https';      // valid values are 'http' and 'https'
config.host = '192.168.1.11';   // use a DNS name for production - 'www.someserver.com'
config.port = 8050;  

config.mongo.connectionstring = 'mongodb://192.168.1.209/Applewood';

config.authKey = 'generate a new signing key';

module.exports = config;
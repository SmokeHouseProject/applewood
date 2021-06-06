var config = require('./config.global');
config.env = "dev";


//todo: add credentials - private key and cert for https server

config.protocol = 'http';       //valid values are 'http' and 'https'
config.host = '0.0.0.0';
config.port = 8050;

config.mongo.connectionstring = 'mongodb://0.0.0.0/Applewood';

// NOTE: generate a unique auth key for every application and environment
config.authKey = 'VsSx9yyoUb1XhSTUTOyaZ6fyIfkAL/qVl/XIC91tryvxtRNy+9ccfpCiqnhalL4yNnMDFY9O2ja2XdrOW4quvL/FeVAviTza7IK1XVY5jAfUioG6z4Lo9bsYFyfdxWyrYSmuv6PuXIfo1iTERIFlUSeTML/kHyV27TEfg0hwzYCWayo/83qpldFaDXEX9mE47ToHw0LqyjCTxA5ufYaaLI4z0hsN5LJwKUESYsHD4niU4AVmkgimXMa+19l5oZeqmp8QRNO9m335lwum6yNz/6OsJAVraI8oyHMKAZ1aamrGKh+0jBsywIvatu/rmgLJlJBtgLqHXjkilSy94py7+Q==';

module.exports = config;

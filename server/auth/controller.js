'use strict';
var Promise = require('bluebird');
var bcrypt = require('bcryptjs');
var nJwt = require('njwt');
var secureRandom = require('secure-random');
var config = require('../config');
var moment = require('moment');
var error = require('../constants/errors');
const USER_FIELDS = '_id username password displayName role created';

module.exports = function (entity) {

    var module = {};

    //test for the users password and then create a jwt token
    module.authenticate = function (req, res) {

        entity.findOne({ 'username': req.body.username }, USER_FIELDS, function (err, user) {
            if (err) {
                return res.status(400).json({ message: err.message });
            }

            if (user) {
                //check the password
                if (bcrypt.compareSync(req.body.password, user.password)) {

                    //generate jwt token
                    var signingKey = config.authKey;
                    var iss = config.protocol + '://' + config.host + ':' + config.port;

                    var claims = {
                        iss: iss,               // The URL of this web service
                        sub: user._id,          // The UID of the user in your system
                        scope: user.role        // The scope of the users permissions
                    }

                    var jwt = nJwt.create(claims, signingKey);
                    var token = jwt.compact();

                    //don't return user password
                    user.password = null;

                    return res.status(201).json({ token: token, user: user });

                } else {
                    return res.status(201).json(error.wrongPassword);
                }
            } else {
                return res.status(201).json(error.unknownUser);
            }

        });
    }

    module.validate = function (req, res, next) {

        if (!req.headers.authorization) {
            return res.status(401).json(error.missingAuthHeader);
        }
        var token = req.headers.authorization;

        var payload = null;
        try {
            payload = nJwt.verify(token, config.authKey);
        }
        catch (err) {
            return res.status(401).json({ message: err.message });
        }

        if (payload.exp <= moment().unix()) {
            return res.status(401).json(error.tokenExpired);
        }

        req.user = payload.sub;
        req.role = payload.scope;
        
        next();
    }

    return module;
}

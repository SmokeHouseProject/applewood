'use strict';

var bcrypt = require('bcryptjs');
var Promise = require('bluebird');
var config = require('./config');
var mongoose = require('mongoose');
var md5 = require('blueimp-md5');

console.log('Connecting to ' + config.mongo.connectionstring);
mongoose.connect(config.mongo.connectionstring);

// Add user with admin role and username = sam and password = crow
function addUser() {
    return new Promise(function(resolve, reject) {
        var model = require('./api/user/model');

        var user = new model({
            username: 'sam',
            password: bcrypt.hashSync(md5('crow'), 10),
            displayName: 'Sam Crow',
            role: 9,    //Admin role
            created: Date.now()
        });

        //check to see if user is already in db
        model.findOne({'username': user.username }, '_id', function(err, id) {
            if (err) {
                return reject(console.log(err));
            }
            if (id) {
                return reject(console.log('user is already in the db'));
            }

            user.save(function (err) {
                if (err) {
                    return reject(console.log(err));
                } else {
                    return resolve(console.log('user added to db'));
                }
            });
        });
    });
}

function exit() {
    process.exit();
}

addUser().then(exit, exit);
   





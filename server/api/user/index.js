'use strict';
var Promise = require('bluebird');
var _ = require('lodash');
var express = require('express');
var entity = require('./model');
var controller = require('../controller/controller')(entity);
var router = express.Router();
var auth = require('../../auth/controller')();
var bcrypt = require('bcryptjs');
var error = require('../../constants/errors');
const USER_FIELDS = '_id username displayName role created';

router.use(auth.validate); 
router.get('/', getUsers);
router.get('/:id', getUser);
router.post('/', createUser);
router.put('/:id', updateUser);
router.delete('/:id', controller.destroy);

module.exports = router;

function getUsers(req, res) {
    //do not return passwords
    var query = {};
    entity.find(query, USER_FIELDS, function (err, items) {
      if (err) {
        return handleError(res, { message: err.message });
      }
      return res.status(200).json(items)
    });
}

function getUser(req, res) {
      //do not return password  
      entity.findById(req.params.id, USER_FIELDS, function (err, item) {
      if (err) {
        return handleError(res, { message: err.message });
      }
      if (!item) {
        return res.send(404);
      }
      return res.json(item);
    });
}

// Creates a unique user
function createUser(req, res) {

    entity.findOne({ 'username': req.body.username }, '_id', function (err, id) {
        if (err) {
            return handleError(res, { message: err.message });
        }
        if (id) {
            return handleError(res, error.duplicateUser);
        }

        //encode the password
        req.body.password = bcrypt.hashSync(req.body.password, 10);

        entity.create(req.body, function (err, item) {
            if (err) {
                return handleError(res, { message: err.message });
            }
            return res.status(201).json(item);
        });
    });
}

//update user using encoded password
function updateUser(req, res) {

    if (req.body._id) {
        delete req.body._id;
    }

    entity.findById(req.params.id, USER_FIELDS, function (err, item) {
        if (err) {
            return handleError(res, { message: err.message });
        }

        if (!item) {
            return res.send(404);
        }

        checkUserName(req, res, item).then(
            ok => {
                //username is ok so continue

                //encode the password - only if we get one from the request
                if (_.isEmpty(req.body.password)) {
                    delete req.body.password;
                } else {
                    req.body.password = bcrypt.hashSync(req.body.password, 10);
                }
    
                var updated = _.merge(item, req.body);
                updated.save(function (err) {
                    if (err) {
                        return handleError(res, { message: err.message });
                    }
                    return res.status(200).json(item);
                });
            },
            err => {
                return handleError(res, { message: err.message });
            }
        );
            
    });
};

function checkUserName(req, res, item) {

    return new Promise((resolve, reject) => {
        //test for a change in username
        if (req.body.username !== item.username) {
            //test for unique 
            entity.findOne({ 'username': req.body.username }, '_id', function (err, id) {
                if (err) {
                    reject(formatError(err));
                }
                if (id) {
                    reject(formatError(error.duplicateUser));
                } else {
                    resolve('ok');
                }
            })
        } else {
            resolve('ok');
        }
    })

}

function formatError(e) {
    let error = new Error();
    error.message = e.message;
    return error;
}

function handleError(res, err) {
    return res.status(400).json(err);
}
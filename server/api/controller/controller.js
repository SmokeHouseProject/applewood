/**
 * Using common naming convention for endpoints.
 * GET     /items              ->  index
 * POST    /items              ->  create
 * GET     /items/:id          ->  show
 * PUT     /items/:id          ->  update
 * DELETE  /items/:id          ->  destroy
 */

'use strict';
var _ = require('lodash');
var error = require('../../constants/errors');

//  todo:
//  after authentication the req contains:
//  req.user = logged in user id
//  req.roles = logged in user roles
//  we can add further verification that user exists and has permission to access the requested service


module.exports = function (entity) {

  var module = {};

  // Get list of items
  module.index = function (req, res) {
    var query = {};
    entity.find(query, function (err, items) {
      if (err) {
        return handleError(res, { message: err.message });
      }
      return res.status(200).json(items)
    });
  };

  // Get a single item
  module.show = function (req, res) {
    entity.findById(req.params.id, function (err, item) {
      if (err) {
        return handleError(res, { message: err.message });
      }
      if (!item) {
        return res.sendStatus(404);
      }
      return res.json(item);
    });
  };

  // Creates a new item
  module.create = function (req, res) {
    entity.create(req.body, function (err, item) {
      if (err) {
        return handleError(res, { message: err.message });
      }
      return res.status(201).json(item);
    });
  };

  // Updates an existing item
  module.update = function (req, res) {
    if (req.body._id) {
      delete req.body._id;
    }
    entity.findById(req.params.id, function (err, item) {
      if (err) {
        return handleError(res, { message: err.message });
      }
      if (!item) {
        return res.sendStatus(404);
      }
      var updated = _.merge(item, req.body);
      updated.save(function (err) {
        if (err) {
          return handleError(res, { message: err.message });
        }
        return res.status(200).json(item);

      });
    });
  };

  // Deletes an item
  module.destroy = function (req, res) {
    entity.findById(req.params.id, function (err, item) {
      if (err) {
        return handleError(res, { message: err.message });
      }
      if (!item) {
        return res.sendStatus(404);
      }
      item.remove(function (err) {
        if (err) {
          return handleError(res, { message: err.message });
        }
        return res.sendStatus(204);
      });
    });
  };

  function handleError(res, err) {
    return res.status(400).json(err);
  }

  return module;
}

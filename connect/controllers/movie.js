'use strict';

var router = require('express').Router();
var async = require('async');
var db = require('../db.js');
//var auth = require('../auth.js');

/**
 * @api {GET} /movies List all movies.
 * @apiName list
 * @apiGroup Season
 */
 //.get(auth())
router
.route('/movies')
.get(function (request, response, next) {
  async.waterfall([function(next){
    db.cypher({query: 'MATCH (u:Filme) RETURN u'}, next) 
  }, function(movies, next){
    response.status(200);
    response.send(movies);
  }], next)
});

/**
 * @api {GET} /movies/:id Get season.
 * @apiName get
 * @apiGroup Season
 .get(auth())
 */
router
.route('/movies/:id')

.get(function (request, response) {
  response.status(200);
  response.send(request.movie);
});

router.param('id', function (request, response, next, id) {
  async.waterfall([function(next) {
    db.cypher({
      query : 'MATCH (u:Movie {id : {id}}) RETURN u',
      params: {id: id*1}
    }, next);
  }, function(movies, next) {
    if(movies.length === 0){
      return next(new Error('Not Found'));
    }
    else{
      request.movie = movies[0];
      next();
    }
  }], next);
});

module.exports = router;
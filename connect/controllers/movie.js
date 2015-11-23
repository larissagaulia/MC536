'use strict';

var router = require('express').Router();
var async = require('async');
var db = require('../db.js');
//var auth = require('../auth.js');

/** */
router
.route('/:userId/user_movies')

.get(function (request, response) {
  response.status(200);
  response.send(request.similarusers);
});

router.param('userId', function (request, response, next, userId) {
  async.waterfall([function(next) {
    db.cypher({
      query : 'MATCH (u1:User {userId: {userId}})-[s:SIMILARIDADE]-(u2:User) WITH  u2, s.similaridade as similarFactor ORDER BY similarFactor DESC LIMIT 5 RETURN u2 as Vizinhos',
      params: {userId: userId}
    }, next);
  }, function(similarusers, next) {
    if(similarusers.length === 0){
      return next(new Error('Not Found'));
    }
    else{
      request.similarusers = similarusers;
      //request.movies = movies;
      next();
    }
  }], next);
});

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
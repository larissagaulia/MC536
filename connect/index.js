'use strict';
var Domain, cluster, domain, nconf, async;
Domain = require('domain');
cluster = require('cluster');
nconf = require('nconf');
domain = Domain.create();
async = require('async');

nconf.env();
nconf.defaults({
  'PORT'            : 3000,
  'NEO4J'           : 'http://neo4j:123@localhost:7474'
});


domain.on('error', function (error) {
  console.error(error.message);
  console.error(error.stack);
  cluster.worker.disconnect();
  setTimeout(process.exit, 5000);
});

domain.run(function () {
  var express, helmet, bodyParser, compression, responseTime, timeout, app, emitter;

  setInterval(function memoryUsageControl() {
    var usage;
    usage = process.memoryUsage().heapUsed / 1000000;
    if (usage > 100 && process.env.NODE_ENV !== 'test') emitter.emit('error', new Error('memory leak heap usage reached ' + usage + 'mB'));
  }, 10000);

  express = require('express');
  helmet = require('helmet');
  bodyParser = require('body-parser');
  compression = require('compression');
  responseTime = require('response-time');
  timeout = require('connect-timeout');
  emitter = new (require('events').EventEmitter)();

  app = express();
  app.use(helmet.xssFilter());
  app.use(helmet.frameguard());
  app.use(helmet.hidePoweredBy());
  app.use(helmet.ieNoOpen());
  app.use(helmet.noSniff());
  app.use(helmet.noCache());
  app.use(bodyParser.json());
  app.use(bodyParser.urlencoded({extended : true}));
  app.use(compression());
  app.use(responseTime());
  app.use('/docs', express.static(__dirname + '/docs'));
  app.use(timeout('30s'));
  app.use(require('./controllers/movie.js'));

  app.use(function (error, request, response, next) {
    if(error.message === 'Invalid Session'){
      response.status(401).end();
    } else if(error.message === 'Not Found'){
      response.status(404).end();
    } else {
      response.status(500).end();
      emitter.emit('error', error);
      next();
    }
    
  });

  //enable CORS
  app.use(function(req, res, next) {
    res.header('Access-Control-Allow-Origin', '*');
    res.header('Access-Control-Allow-Methods', 'GET,PUT,POST,DELETE');
    res.header('Access-Control-Allow-Headers', 'Content-Type, Authorization');

    next();
  })

  app.post('/register', function(req, res){
    console.log(req.body);
    res.send('hi!');
  })

  app.listen(nconf.get('PORT'), function(){
    console.log("listening on ", nconf.get('PORT'));
  });
  module.exports = app;
});
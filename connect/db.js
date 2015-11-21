var nconf = require('nconf');
var neo4j = require('neo4j');
module.exports = new neo4j.GraphDatabase(nconf.get('NEO4J'));

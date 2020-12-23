
var mockServer = require('node-mock-server');
var path = require('path');

mockServer({
	'title': 'API Mock Server',
	'version': '1',
	'contentType': 'application/json',
	'accessControlExposeHeaders': 'X-Total-Count',
	'accessControlAllowOrigin': '*',
	'accessControlAllowMethods': 'GET, POST, PUT, OPTIONS, DELETE, PATCH, HEAD',
	'accessControlAllowHeaders': 'origin, x-requested-with, content-type',
	'accessControlAllowCredentials': 'true',
	'urlBase': 'http://localhost:3001',
	'urlPath': '/api/v1',
	'port': '3001',
	'uiPath': '/',
	'funcPath': path.join(__dirname, '/func'),
	'swaggerImport': {
		'protocol': 'http',
		'host': 'localhost',
		'port': '4444',
		'path': '/swagger.json', // endpoint que sirve el swagger
		'replacePathsStr': '',
		'createErrorFile': true,
		'createEmptyFile': true,
		'overwriteExistingDescriptions': true,
		'responseFuncPath': path.join(__dirname, 'func-imported'),
		'dest': path.join(__dirname, '/rest')
	},
	'restPath': path.join(__dirname, '/rest'),
	'dirName': __dirname
});


var mockServer = require('node-mock-server');
var path = require('path');

mockServer({
	'title': 'Api mock server',
	'version': '1',
	'headers': {},
	'contentType': 'application/json',
	'accessControlExposeHeaders': 'X-Total-Count',
	'accessControlAllowOrigin': '*',
	'accessControlAllowMethods': 'GET, POST, PUT, OPTIONS, DELETE, PATCH, HEAD',
	'accessControlAllowHeaders': 'origin, x-requested-with, content-type',
	'accessControlAllowCredentials': 'false',
	'privateKey': '',
	'certificate': '',
	'urlBase': 'http://localhost:3001',
	'urlPath': '/api/v1',
	'port': '3001',
	'uiPath': '/',
	'funcPath': path.join(__dirname, '/func'),
	'swaggerImport': {
		'protocol': 'http',
		'host': 'petstore.swagger.io',
		'port': '80',
		'path': '/v2/swagger.json',
		'replacePathsStr': '',
		'createErrorFile': true,
		'createEmptyFile': true,
		'overwriteExistingDescriptions': true,
		'responseFuncPath': path.join(__dirname, 'func-imported'),
		'dest': path.join(__dirname, '/rest')
	},
	'tunnel': {
		'protocol': 'http',
		'host': 'localhost',
		'port': '80',
		'headers': {}
	},
	'restPath': path.join(__dirname, '/rest'),
	'dirName': __dirname
});

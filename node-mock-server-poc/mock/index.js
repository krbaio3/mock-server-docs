const mockServer = require('node-mock-server');
const { join } = require('path');
// const { oauthGET } = require('./middleware');

mockServer({
  title: 'API Mock Server',
  version: '1',
  contentType: 'application/json',
  accessControlExposeHeaders: 'X-Total-Count',
  accessControlAllowOrigin: '*',
  accessControlAllowMethods: 'GET, POST, PUT, OPTIONS, DELETE, PATCH, HEAD',
  accessControlAllowHeaders: 'origin, x-requested-with, content-type',
  accessControlAllowCredentials: 'true',
  urlBase: 'http://localhost:3001',
  urlPath: '/api/v1',
  port: '3001',
  uiPath: '/',
  funcPath: join(__dirname, '/func'),
  middleware: {
    '/rest/hello/#{param}/GET'(serverOptions, requestOptions) {
      // console.log('headers', JSON.stringify(serverOptions, null, 4));
      // console.log('requestOptions', requestOptions);

      return 'response-data';
    },
    '/rest/oauth/#uri#{aspsp}/GET'(serverOptions, requestOptions) {
      return 'success';
    },
    '/rest/oauth/#{aspsp}/GET'(serverOptions, requestOptions) {
      // oauthGET(serverOptions, requestOptions);
      return 'empty';
    },
  },
  swaggerImport: {
    protocol: 'http',
    host: 'localhost',
    port: '4444',
    path: '/swagger.json', // endpoint que sirve el swagger
    replacePathsStr: '',
    createErrorFile: true,
    createEmptyFile: true,
    overwriteExistingDescriptions: true,
    responseFuncPath: join(__dirname, 'func-imported'),
    dest: join(__dirname, '/rest'),
  },
  restPath: join(__dirname, '/rest'),
  dirName: __dirname,
});

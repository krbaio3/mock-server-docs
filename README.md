# MOCK SERVER

## Nock

[Nock](https://github.com/nock/nock)

Es más para testing. Intercepta llamadas y devuelve la respuesta que queramos

## Pretender

[Pretender](https://github.com/pretenderjs/pretender)

Sólo funciona en el navegador

## Mocks Server

[mocks-server](https://github.com/mocks-server/main)

mocks-server-poc:

Va con plugins

## Drakov

[Drakov](https://github.com/Aconex/drakov)

Sigue el API de [Blue Print](https://apiblueprint.org/)

## wiremock npm

Revisar esta [issue](https://github.com/tomakehurst/wiremock/issues/514)

Hay dos wrapper, uno parece descontinuado, y otro activo.

Descontinuado: [wiremock-js](https://github.com/stratouklos/wiremock-js)

[wiremock](https://github.com/tomasbjerre/wiremock-npm)

Wrapper de wiremock para nodejs. Ocupa 13,5Mb. Usa node-jre

[node-mock-server](https://github.com/smollweide/node-mock-server)

instalación:

## node-mock-server-poc

```bash
$ npm install node-mock-server --save-dev
Done!
```

inicialización:

```bash
$ node node_modules/node-mock-server/init
Done!
```

Características:

- Node 6
- Mock Server UI
- Swagger import

```bash
node node_modules/node-mock-server/init

 |                                    |
 |        node-mock-server init       |
 |                                    |

? Enter the desired path (from your current directory) to store the mock server data mock
➜ Wrote directory "mock"
➜ Wrore directory "mock/rest"
➜ .gitignore was updated
? Do you want to use the default configuration? No
? Enter the title of the API API mock server poc
? Enter the version number of the API 1
? Do you want to use the default response headers? No
? Enter "Content-Type" response header application/json
? Enter "Access-Control-Expose-Headers" response header X-Total-Count
? Enter "Access-Control-Allow-Origin" response header *
? Enter "Access-Control-Allow-Methods" response header GET, POST, PUT, OPTIONS, DELETE, PATCH, HEAD
? Enter "Access-Control-Allow-Headers" response header origin, x-requested-with, content-type
? Enter "Access-Control-Allow-Credentials" response header true
? Do you want to add another response header? Yes
? Enter response header key
? Enter response header value
? Do you want to add another response header? No
? Want to use SSL? Yes
? Enter the desired path (from the mock server directory) to the "private key" file
? Enter the desired path (from the mock server directory) to the "certificate" file
? Enter the url under which the server should be accessible (just protocol, host and port) http://localhost:3001
? Enter the url path under which the server should be accessible /api/v1
? Enter the url port which the server should be accessible 3001
? Enter the url path under which the UI should be accessible /
? Enter the desired path (from the mock server directory) to store the mock functions /func
? Do you want to use the swagger import? Yes

/**
 *  To import schemas from swagger you need to provide the url to the swagger api json file.
 *  In case of you want to import the schemas from "http://petstore.swagger.io/".
 *  You need to provide this url: http://petstore.swagger.io/v2/swagger.json
**/

? Enter the swagger url protocol http
? Enter the swagger url basic auth user name
? Enter the swagger url basic auth password
? Enter the swagger url host petstore.swagger.io
? Enter the swagger url port 80
? Enter the swagger url path /v2/swagger.json
? Enter the part of the endpoints which should be removed (if needed)
? Write error response files while importing? Yes
? Write empty response files while importing? Yes
? Overwrite existing descriptions? Yes
? Enter the desired path (from the mock server directory) to store the imported mock functions func-imported
? Enter the path to a custom "DTO to class" template
? Want to use a tunnel? Yes
? Enter the tunnel url protocol http
? Enter the tunnel url basic auth user name
? Enter the tunnel url basic auth password
? Enter the tunnel url host localhost
? Enter the tunnel url port 80
? Do you want to add a tunnel request header? Yes
? Enter request header key
? Enter request header value
? Do you want to add a tunnel request header? Yes
? Enter request header key
? Enter request header value
? Do you want to add a tunnel request header? Yes
? Enter request header key
? Enter request header value
? Do you want to add a tunnel request header? Yes
? Enter request header key
? Enter request header value
? Do you want to add a tunnel request header? No
➜ Wrote file "mock/index.js"
```

```txt
Run `node mock swagger-import` for importing schemas!
Run `node mock` for starting the server!
```

File => mock/index.js

ver cómo funciona con swagger

Solo en JS ( JS + Flow)

## Projecto swagger-server

Para levantar los swagger, se usa un mini-servidor express.

```js
const express = require('express');
const app = express();
const swaggerDocument = require('./swagger.json');

app.get('/swagger.json', (request, response) => {
  const event = new Date(Date.now());
  console.log('Envío de swagger ', event.toLocaleTimeString('es-ES'));
  response.json(swaggerDocument);
});

app.listen(
  {
    port: 4444,
  },
  () => console.info('Ejecutando Swagger en "/swagger.json" puerto: 4444'),
);
```

Es muy simple.

### Others things

Pruebas

- [issue](https://stackoverflow.com/questions/34733253/converting-a-swagger-yaml-file-to-json-from-the-command-line)

#### Download current stable 2.x.x branch (Swagger and OpenAPI version 2)

```
wget https://repo1.maven.org/maven2/io/swagger/swagger-codegen-cli/2.4.17/swagger-codegen-cli-2.4.17.jar -O swagger-codegen-cli.jar

java -jar swagger-codegen-cli.jar help

swagger-codegen generate -i swagger.yaml -l swagger
```

Fuera

---

Copiar el swagger.yaml de ejemplo y ponerlo [aqui](https://editor.swagger.io/).
Pasarlo a JSON y guardarlo en [swagger-server](#projecto-swagger-server) como
`swagger.json`. Parece ser, que `node-mock-server` no se lleva bien con el
`$ref`. Dejarlo sin ello

ejecutamos `npm start`

Volvemos al proyecto [node-mock-server-poc](#node-mock-server-poc)

Configuramos en el `index.js` la parte de swagger

##### index.js

```javascript
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
  funcPath: path.join(__dirname, '/func'),
  swaggerImport: {
    protocol: 'http',
    host: 'localhost',
    port: '4444',
    path: '/swagger.json', // endpoint que sirve el swagger
    replacePathsStr: '',
    createErrorFile: true,
    createEmptyFile: true,
    overwriteExistingDescriptions: true,
    responseFuncPath: path.join(__dirname, 'func-imported'),
    dest: path.join(__dirname, '/rest'),
  },
  restPath: path.join(__dirname, '/rest'),
  dirName: __dirname,
});
```

Importamos el swagger desde la interfaz gráfica.

Una vez importado el swagger, pasamos el Validate All Mocks Response

En el botón de DTO's, vemos que se nos han generado los objetos que teníamos en
los swagger. Al pulsar sobre ellos, nos da la opción de generar el código que
queramos seleccionando unos checkBox

Están vacías las respuestas y los errores

Por carpetas:

- func: es una carpeta para crear nuestras funciones de mocks, podemos crear
  archivos js como este:

```javascript
module.exports = {
  image: function (url, alt) {
    url = url || 'http://lorempixel.com/100/100/people';
    alt = alt || 'Alt';

    return JSON.stringify({
      url: url,
      alt: alt,
    });
  },
};
```

que pueden ser llamados más adelante dentro de las validaciones del JSON.

> La carpeta func-imported es autogenerada cuando se importa el YAML, si vamos a
> importar más YAML, deberemos de mover las funciones que queramos (o las que
> modifiquemos) de la carpeta `func-imported` a la `func`. No se recomienda
> poner el path de `respcnseFuncPath` en `funcPath`

```text
Después de una "importación de swagger" encontrará un montón de funciones simuladas, si se define
"options.swaggerImport.responseFuncPath". Estas "funciones simuladas" se sobrescribirán para cada importación, para
asegurarse de que pueda utilizarlas, copie las que necesite en su directorio habitual de "funciones simuladas"
(options.funcPath). Lo que significa que no debe agregar "options.swaggerImport.responseFuncPath" a "options.funcPath"
 para evitar conflictos.
```

- Para validaciones tipo OPTIONS ver el
  [Middleware](https://github.com/smollweide/node-mock-server/blob/master/doc/readme-middleware.md)

- Para exponer contenido estático en la carpeta public, se hace con la propiedad
  [expressMiddleware](https://github.com/smollweide/node-mock-server/blob/master/doc/readme-express-middleware.md)

- Responses: para error 500, crear `error.json`, para error 401,
  `error-401.json` Si un parámetro está mal informado.

  > For an error response the default HTTP status code is 500, but you can
  > specify a different status code by suffixing the name of your error response
  > with the appropriate status code, like `error-423.json`.

- Para agregar cabeceras, se pueden crear de manera global para todas las
  peticiones, en el [index.js](#indexjs) con el atributo `headers`, o dentro de
  cada carpeta `mock` con un fichero `json`:
  `{error|success|error-401|...}.headers.json` ,
  [aquí](https://github.com/smollweide/node-mock-server/blob/master/doc/readme-response-header.md)
  está la documentación oficial

- Para cambiar entre respuestas sin cambiar la configuración, leer esta
  [issue](https://github.com/smollweide/node-mock-server/issues/148)

- Collections: cuando se le indica que tiene que dar una respuesta fija, por
  ejemplo, de errores, se crea dentro de la carpeta `rest/{PATH}/{METODO}/mock`
  un archivo `response.txt` que es el que mockea la respuesta (es muy simple,
  crea el archivo con lo que tiene que responder)

Se ha abierto una
[issue](https://github.com/smollweide/node-mock-server/issues/158#issue-773975483)
a node-mock-server.

I'm using your library, and there are things that I don't understand even though
I have read and reread the docs.

I have an imported swagger as the docs describe, and it creates in the
mock/rest/\_DTO folder the data transfer objects ( DTO), of which one of them it
is empty, when the YAML, it has values indicate (by `$ref`) which would be the
departure. At first, it isn't a problem, because I can rewrite this file.

The swagger that I import, has the `pattern`, `example` and `format` fields, but
when I look in the `mock/rest/YAML_NAME/POST/mock/folder`, I find that
{empty/error/success}.json files, all three jsons are empty. The values
indicated in the swagger, are only used when the `Validate All Mock Responses`
are executed, or should I create response mocks with it?

In the folder `mock/func-imported`, I have included three corresponding files
with the `Request/Response` of my swagger, but I don't see them being used (or I
don't know how to use them), rereading the documentation I understand that I
must copy&paste them in the `func` folder to be able to use them, and its use
would be the same as in the `faker.json` file?

The last doubt, It's about collections, a json is generated with the responses
that the service will give once it is invoked, but, as a general rule, if I have
a service with X validations, if no collection is created, it will work
normally, and if it passes the validations, it will return `success.json` file,
but if it doesn't pass the validation, How can I indicate the specific`json`
that it should be sent?, that is, can you create a file `error-400.json` to
overwrite the default response of system?, or, is it done in another way?

Se le ha escrito por Twitter.

#### Juego con hello

En la carpeta mock, se pueden poner las respuestas que va a tener el servicio.
(se ha descrito en un punto anterior)

Hay que picarlas. En este ejemplo, se ha agregado la respuesta
`response-data.json`.

Es recomendable que con cada nueva importación de swagger o desarrollo de
cualquier nuevo `mock`, codifiquemos el archivo `request_schema.json` y el
`response_schema.json` (este último, no he conseguido hacer que se ejecute con
cada petición)

Cuando se agrege un archivo nuevo (response => success), se debe de ejecutar las
validaciones (descritas en el `response_schema.json`). Si cuando se ejecuten las
validaciones (pulsar Validate dentro de la modal, para seleccionar el
resultado), da este error:

```bash
✖ 11:13:43: No schema definition for: param found, please check you schema and/or mock file!
✖ 11:13:43: Mock da
ta in file /hello/#{param}/GET/mock/request-data.json are invalid! 1 invalid values found.
```

Es porque en el fichero de `response_schema.json` no se ha codificado la salida
o no cumple la salida que el mock debiera de tener.

este es un ejemplo:

`response-data.json`

```json
{
  "hello": "<%=params.param%>"
}
```

response_schema.json

```json
{
  "hello": "string"
}
```

Al validar el json no debiera de haber problemas.

`request-schema.json`, es un validador

Las validaciones no tienen en cuenta las cabeceras. Habrá que picarse un método
en middleware para que las valide.

Cuando se entra dentro de una descripcion, nos sale la pantalla con tres
opciones:

- mock
- response
- request

Mock, seleccionamos la respuesta que nos dará la url Response, mini salida (sin
datos). Para verlo mejor, abrir la opción de Schema Request: mini doc de como
tiene que ser la entrada. Abrir Schema para ver todas las opciones. No tiene en
cuenta las cabeceras de entrada.

_request_schema.json_ No he encontrado de que funcione como validación, ni en el
código ni en documentacion.

Middleware:

Se puede usar los middleware para que hagan la funcion de validaciones de
headers. Hay que picarse la lógica y cada archivo de respuesta para incluir los
hearders

En el index.js, en el apartado de mockserver, incluir este fragmento:

```js
 middleware: {
    '/rest/hello/#{param}/GET'(serverOptions, requestOptions) {
      console.log('headers', JSON.stringify(serverOptions, null, 4));
      var productCode = requestOptions.req.headers;

      console.log('---->', productCode);

      return 'response-data';
    },
  },
```

Ejemplo de entrada de serverOptions

```json
{
  "restPath": "/Users/krbaio3/Worker/Atmira/LBK/mock-servers-election/node-mock-server-poc/mock/rest",
  "uiPath": "/",
  "title": "API Mock Server",
  "version": "1",
  "urlBase": "http://localhost:3001",
  "urlPath": "/api/v1",
  "port": "3001",
  "contentType": "application/json",
  "accessControlExposeHeaders": "X-Total-Count",
  "accessControlAllowOrigin": "*",
  "accessControlAllowMethods": "GET, POST, PUT, OPTIONS, DELETE, PATCH, HEAD",
  "accessControlAllowHeaders": "origin, x-requested-with, content-type",
  "accessControlAllowCredentials": "true",
  "headers": {},
  "open": true,
  "dirName": "/Users/krbaio3/Worker/Atmira/LBK/mock-servers-election/node-mock-server-poc/mock",
  "swaggerImport": {
    "protocol": "http",
    "host": "localhost",
    "port": "4444",
    "path": "/swagger.json",
    "replacePathsStr": "",
    "createErrorFile": true,
    "createEmptyFile": true,
    "overwriteExistingDescriptions": true,
    "responseFuncPath": "/Users/krbaio3/Worker/Atmira/LBK/mock-servers-election/node-mock-server-poc/mock/func-imported",
    "dest": "/Users/krbaio3/Worker/Atmira/LBK/mock-servers-election/node-mock-server-poc/mock/rest",
    "dirName": "/Users/krbaio3/Worker/Atmira/LBK/mock-servers-election/node-mock-server-poc/mock"
  },
  "middleware": {},
  "funcPath": "/Users/krbaio3/Worker/Atmira/LBK/mock-servers-election/node-mock-server-poc/mock/func"
}
```

Ejemplo de entrada de requestOptions.req

```json
IncomingMessage {
  _readableState: ReadableState {
    objectMode: false,
    highWaterMark: 16384,
    buffer: BufferList { head: null, tail: null, length: 0 },
    length: 0,
    pipes: [],
    flowing: null,
    ended: false,
    endEmitted: false,
    reading: false,
    constructed: true,
    sync: true,
    needReadable: false,
    emittedReadable: false,
    readableListening: false,
    resumeScheduled: false,
    errorEmitted: false,
    emitClose: true,
    autoDestroy: false,
    destroyed: false,
    errored: null,
    closed: false,
    closeEmitted: false,
    defaultEncoding: 'utf8',
    awaitDrainWriters: null,
    multiAwaitDrain: false,
    readingMore: true,
    decoder: null,
    encoding: null,
    [Symbol(kPaused)]: null
  },
  _events: [Object: null prototype] { end: [Function: clearRequestTimeout] },
  _eventsCount: 1,
  _maxListeners: undefined,
  socket: <ref *1> Socket {
    connecting: false,
    _hadError: false,
    _parent: null,
    _host: null,
    _readableState: ReadableState {
      objectMode: false,
      highWaterMark: 16384,
      buffer: BufferList { head: null, tail: null, length: 0 },
      length: 0,
      pipes: [],
      flowing: true,
      ended: false,
      endEmitted: false,
      reading: true,
      constructed: true,
      sync: false,
      needReadable: true,
      emittedReadable: false,
      readableListening: false,
      resumeScheduled: false,
      errorEmitted: false,
      emitClose: false,
      autoDestroy: true,
      destroyed: false,
      errored: null,
      closed: false,
      closeEmitted: false,
      defaultEncoding: 'utf8',
      awaitDrainWriters: null,
      multiAwaitDrain: false,
      readingMore: false,
      decoder: null,
      encoding: null,
      [Symbol(kPaused)]: false
    },
    _events: [Object: null prototype] {
      end: [Array],
      timeout: [Function: socketOnTimeout],
      data: [Function: bound socketOnData],
      error: [Function: socketOnError],
      close: [Array],
      drain: [Function: bound socketOnDrain],
      resume: [Function: onSocketResume],
      pause: [Function: onSocketPause]
    },
    _eventsCount: 8,
    _maxListeners: undefined,
    _writableState: WritableState {
      objectMode: false,
      highWaterMark: 16384,
      finalCalled: false,
      needDrain: false,
      ending: false,
      ended: false,
      finished: false,
      destroyed: false,
      decodeStrings: false,
      defaultEncoding: 'utf8',
      length: 0,
      writing: false,
      corked: 0,
      sync: true,
      bufferProcessing: false,
      onwrite: [Function: bound onwrite],
      writecb: null,
      writelen: 0,
      afterWriteTickInfo: null,
      buffered: [],
      bufferedIndex: 0,
      allBuffers: true,
      allNoop: true,
      pendingcb: 0,
      constructed: true,
      prefinished: false,
      errorEmitted: false,
      emitClose: false,
      autoDestroy: true,
      errored: null,
      closed: false,
      closeEmitted: false,
      [Symbol(kOnFinished)]: []
    },
    allowHalfOpen: true,
    _sockname: null,
    _pendingData: null,
    _pendingEncoding: '',
    server: Server {
      maxHeaderSize: undefined,
      insecureHTTPParser: undefined,
      _events: [Object: null prototype],
      _eventsCount: 2,
      _maxListeners: undefined,
      _connections: 3,
      _handle: [TCP],
      _usingWorkers: false,
      _workers: [],
      _unref: false,
      allowHalfOpen: true,
      pauseOnConnect: false,
      httpAllowHalfOpen: false,
      timeout: 0,
      keepAliveTimeout: 5000,
      maxHeadersCount: null,
      headersTimeout: 60000,
      requestTimeout: 0,
      _connectionKey: '6::::3001',
      [Symbol(IncomingMessage)]: [Function: IncomingMessage],
      [Symbol(ServerResponse)]: [Function: ServerResponse],
      [Symbol(kCapture)]: false,
      [Symbol(async_id_symbol)]: 4
    },
    _server: Server {
      maxHeaderSize: undefined,
      insecureHTTPParser: undefined,
      _events: [Object: null prototype],
      _eventsCount: 2,
      _maxListeners: undefined,
      _connections: 3,
      _handle: [TCP],
      _usingWorkers: false,
      _workers: [],
      _unref: false,
      allowHalfOpen: true,
      pauseOnConnect: false,
      httpAllowHalfOpen: false,
      timeout: 0,
      keepAliveTimeout: 5000,
      maxHeadersCount: null,
      headersTimeout: 60000,
      requestTimeout: 0,
      _connectionKey: '6::::3001',
      [Symbol(IncomingMessage)]: [Function: IncomingMessage],
      [Symbol(ServerResponse)]: [Function: ServerResponse],
      [Symbol(kCapture)]: false,
      [Symbol(async_id_symbol)]: 4
    },
    parser: HTTPParser {
      '0': [Function: bound setRequestTimeout],
      '1': [Function: parserOnHeaders],
      '2': [Function: parserOnHeadersComplete],
      '3': [Function: parserOnBody],
      '4': [Function: parserOnMessageComplete],
      '5': [Function: bound onParserExecute],
      '6': [Function: bound onParserTimeout],
      _headers: [],
      _url: '',
      socket: [Circular *1],
      incoming: [Circular *2],
      outgoing: null,
      maxHeaderPairs: 2000,
      _consumed: true,
      onIncoming: [Function: bound parserOnIncoming],
      [Symbol(resource_symbol)]: [HTTPServerAsyncResource]
    },
    on: [Function: socketListenerWrap],
    addListener: [Function: socketListenerWrap],
    prependListener: [Function: socketListenerWrap],
    setEncoding: [Function: socketSetEncoding],
    _paused: false,
    _httpMessage: ServerResponse {
      _events: [Object: null prototype],
      _eventsCount: 1,
      _maxListeners: undefined,
      outputData: [],
      outputSize: 0,
      writable: true,
      destroyed: false,
      _last: false,
      chunkedEncoding: false,
      shouldKeepAlive: true,
      _defaultKeepAlive: true,
      useChunkedEncodingByDefault: true,
      sendDate: true,
      _removedConnection: false,
      _removedContLen: false,
      _removedTE: false,
      _contentLength: null,
      _hasBody: true,
      _trailer: '',
      finished: false,
      _headerSent: false,
      _closed: false,
      socket: [Circular *1],
      _header: null,
      _keepAliveTimeout: 5000,
      _onPendingData: [Function: bound updateOutgoingData],
      _sent100: false,
      _expect_continue: false,
      req: [Circular *2],
      locals: [Object: null prototype] {},
      [Symbol(kCapture)]: false,
      [Symbol(kNeedDrain)]: false,
      [Symbol(corked)]: 0,
      [Symbol(kOutHeaders)]: [Object: null prototype]
    },
    [Symbol(async_id_symbol)]: 135,
    [Symbol(kHandle)]: TCP {
      reading: true,
      onconnection: null,
      _consumed: true,
      [Symbol(owner_symbol)]: [Circular *1]
    },
    [Symbol(kSetNoDelay)]: false,
    [Symbol(lastWriteQueueSize)]: 0,
    [Symbol(timeout)]: null,
    [Symbol(kBuffer)]: null,
    [Symbol(kBufferCb)]: null,
    [Symbol(kBufferGen)]: null,
    [Symbol(kCapture)]: false,
    [Symbol(kBytesRead)]: 0,
    [Symbol(kBytesWritten)]: 0,
    [Symbol(RequestTimeout)]: undefined
  },
  httpVersionMajor: 1,
  httpVersionMinor: 1,
  httpVersion: '1.1',
  complete: false,
  rawHeaders: [
    'Autorization',
    'adios',
    'User-Agent',
    'PostmanRuntime/7.26.8',
    'Accept',
    '*/*',
    'Postman-Token',
    '00ee319c-9b5d-4478-a316-bb954035b858',
    'Host',
    'localhost:3001',
    'Accept-Encoding',
    'gzip, deflate, br',
    'Connection',
    'keep-alive'
  ],
  rawTrailers: [],
  aborted: false,
  upgrade: false,
  url: '/api/v1/hello/jorge?test=pepe',
  method: 'GET',
  statusCode: null,
  statusMessage: null,
  client: <ref *1> Socket {
    connecting: false,
    _hadError: false,
    _parent: null,
    _host: null,
    _readableState: ReadableState {
      objectMode: false,
      highWaterMark: 16384,
      buffer: BufferList { head: null, tail: null, length: 0 },
      length: 0,
      pipes: [],
      flowing: true,
      ended: false,
      endEmitted: false,
      reading: true,
      constructed: true,
      sync: false,
      needReadable: true,
      emittedReadable: false,
      readableListening: false,
      resumeScheduled: false,
      errorEmitted: false,
      emitClose: false,
      autoDestroy: true,
      destroyed: false,
      errored: null,
      closed: false,
      closeEmitted: false,
      defaultEncoding: 'utf8',
      awaitDrainWriters: null,
      multiAwaitDrain: false,
      readingMore: false,
      decoder: null,
      encoding: null,
      [Symbol(kPaused)]: false
    },
    _events: [Object: null prototype] {
      end: [Array],
      timeout: [Function: socketOnTimeout],
      data: [Function: bound socketOnData],
      error: [Function: socketOnError],
      close: [Array],
      drain: [Function: bound socketOnDrain],
      resume: [Function: onSocketResume],
      pause: [Function: onSocketPause]
    },
    _eventsCount: 8,
    _maxListeners: undefined,
    _writableState: WritableState {
      objectMode: false,
      highWaterMark: 16384,
      finalCalled: false,
      needDrain: false,
      ending: false,
      ended: false,
      finished: false,
      destroyed: false,
      decodeStrings: false,
      defaultEncoding: 'utf8',
      length: 0,
      writing: false,
      corked: 0,
      sync: true,
      bufferProcessing: false,
      onwrite: [Function: bound onwrite],
      writecb: null,
      writelen: 0,
      afterWriteTickInfo: null,
      buffered: [],
      bufferedIndex: 0,
      allBuffers: true,
      allNoop: true,
      pendingcb: 0,
      constructed: true,
      prefinished: false,
      errorEmitted: false,
      emitClose: false,
      autoDestroy: true,
      errored: null,
      closed: false,
      closeEmitted: false,
      [Symbol(kOnFinished)]: []
    },
    allowHalfOpen: true,
    _sockname: null,
    _pendingData: null,
    _pendingEncoding: '',
    server: Server {
      maxHeaderSize: undefined,
      insecureHTTPParser: undefined,
      _events: [Object: null prototype],
      _eventsCount: 2,
      _maxListeners: undefined,
      _connections: 3,
      _handle: [TCP],
      _usingWorkers: false,
      _workers: [],
      _unref: false,
      allowHalfOpen: true,
      pauseOnConnect: false,
      httpAllowHalfOpen: false,
      timeout: 0,
      keepAliveTimeout: 5000,
      maxHeadersCount: null,
      headersTimeout: 60000,
      requestTimeout: 0,
      _connectionKey: '6::::3001',
      [Symbol(IncomingMessage)]: [Function: IncomingMessage],
      [Symbol(ServerResponse)]: [Function: ServerResponse],
      [Symbol(kCapture)]: false,
      [Symbol(async_id_symbol)]: 4
    },
    _server: Server {
      maxHeaderSize: undefined,
      insecureHTTPParser: undefined,
      _events: [Object: null prototype],
      _eventsCount: 2,
      _maxListeners: undefined,
      _connections: 3,
      _handle: [TCP],
      _usingWorkers: false,
      _workers: [],
      _unref: false,
      allowHalfOpen: true,
      pauseOnConnect: false,
      httpAllowHalfOpen: false,
      timeout: 0,
      keepAliveTimeout: 5000,
      maxHeadersCount: null,
      headersTimeout: 60000,
      requestTimeout: 0,
      _connectionKey: '6::::3001',
      [Symbol(IncomingMessage)]: [Function: IncomingMessage],
      [Symbol(ServerResponse)]: [Function: ServerResponse],
      [Symbol(kCapture)]: false,
      [Symbol(async_id_symbol)]: 4
    },
    parser: HTTPParser {
      '0': [Function: bound setRequestTimeout],
      '1': [Function: parserOnHeaders],
      '2': [Function: parserOnHeadersComplete],
      '3': [Function: parserOnBody],
      '4': [Function: parserOnMessageComplete],
      '5': [Function: bound onParserExecute],
      '6': [Function: bound onParserTimeout],
      _headers: [],
      _url: '',
      socket: [Circular *1],
      incoming: [Circular *2],
      outgoing: null,
      maxHeaderPairs: 2000,
      _consumed: true,
      onIncoming: [Function: bound parserOnIncoming],
      [Symbol(resource_symbol)]: [HTTPServerAsyncResource]
    },
    on: [Function: socketListenerWrap],
    addListener: [Function: socketListenerWrap],
    prependListener: [Function: socketListenerWrap],
    setEncoding: [Function: socketSetEncoding],
    _paused: false,
    _httpMessage: ServerResponse {
      _events: [Object: null prototype],
      _eventsCount: 1,
      _maxListeners: undefined,
      outputData: [],
      outputSize: 0,
      writable: true,
      destroyed: false,
      _last: false,
      chunkedEncoding: false,
      shouldKeepAlive: true,
      _defaultKeepAlive: true,
      useChunkedEncodingByDefault: true,
      sendDate: true,
      _removedConnection: false,
      _removedContLen: false,
      _removedTE: false,
      _contentLength: null,
      _hasBody: true,
      _trailer: '',
      finished: false,
      _headerSent: false,
      _closed: false,
      socket: [Circular *1],
      _header: null,
      _keepAliveTimeout: 5000,
      _onPendingData: [Function: bound updateOutgoingData],
      _sent100: false,
      _expect_continue: false,
      req: [Circular *2],
      locals: [Object: null prototype] {},
      [Symbol(kCapture)]: false,
      [Symbol(kNeedDrain)]: false,
      [Symbol(corked)]: 0,
      [Symbol(kOutHeaders)]: [Object: null prototype]
    },
    [Symbol(async_id_symbol)]: 135,
    [Symbol(kHandle)]: TCP {
      reading: true,
      onconnection: null,
      _consumed: true,
      [Symbol(owner_symbol)]: [Circular *1]
    },
    [Symbol(kSetNoDelay)]: false,
    [Symbol(lastWriteQueueSize)]: 0,
    [Symbol(timeout)]: null,
    [Symbol(kBuffer)]: null,
    [Symbol(kBufferCb)]: null,
    [Symbol(kBufferGen)]: null,
    [Symbol(kCapture)]: false,
    [Symbol(kBytesRead)]: 0,
    [Symbol(kBytesWritten)]: 0,
    [Symbol(RequestTimeout)]: undefined
  },
  _consuming: false,
  _dumped: false,
  next: [Function: next],
  baseUrl: '',
  originalUrl: '/api/v1/hello/jorge?test=pepe',
  _parsedUrl: Url {
    protocol: null,
    slashes: null,
    auth: null,
    host: null,
    port: null,
    hostname: null,
    hash: null,
    search: '?test=pepe',
    query: 'test=pepe',
    pathname: '/api/v1/hello/jorge',
    path: '/api/v1/hello/jorge?test=pepe',
    href: '/api/v1/hello/jorge?test=pepe',
    _raw: '/api/v1/hello/jorge?test=pepe'
  },
  params: { '0': 'api/v1/hello/jorge' },
  query: { test: 'pepe' },
  res: <ref *3> ServerResponse {
    _events: [Object: null prototype] { finish: [Function: bound resOnFinish] },
    _eventsCount: 1,
    _maxListeners: undefined,
    outputData: [],
    outputSize: 0,
    writable: true,
    destroyed: false,
    _last: false,
    chunkedEncoding: false,
    shouldKeepAlive: true,
    _defaultKeepAlive: true,
    useChunkedEncodingByDefault: true,
    sendDate: true,
    _removedConnection: false,
    _removedContLen: false,
    _removedTE: false,
    _contentLength: null,
    _hasBody: true,
    _trailer: '',
    finished: false,
    _headerSent: false,
    _closed: false,
    socket: <ref *1> Socket {
      connecting: false,
      _hadError: false,
      _parent: null,
      _host: null,
      _readableState: [ReadableState],
      _events: [Object: null prototype],
      _eventsCount: 8,
      _maxListeners: undefined,
      _writableState: [WritableState],
      allowHalfOpen: true,
      _sockname: null,
      _pendingData: null,
      _pendingEncoding: '',
      server: [Server],
      _server: [Server],
      parser: [HTTPParser],
      on: [Function: socketListenerWrap],
      addListener: [Function: socketListenerWrap],
      prependListener: [Function: socketListenerWrap],
      setEncoding: [Function: socketSetEncoding],
      _paused: false,
      _httpMessage: [Circular *3],
      [Symbol(async_id_symbol)]: 135,
      [Symbol(kHandle)]: [TCP],
      [Symbol(kSetNoDelay)]: false,
      [Symbol(lastWriteQueueSize)]: 0,
      [Symbol(timeout)]: null,
      [Symbol(kBuffer)]: null,
      [Symbol(kBufferCb)]: null,
      [Symbol(kBufferGen)]: null,
      [Symbol(kCapture)]: false,
      [Symbol(kBytesRead)]: 0,
      [Symbol(kBytesWritten)]: 0,
      [Symbol(RequestTimeout)]: undefined
    },
    _header: null,
    _keepAliveTimeout: 5000,
    _onPendingData: [Function: bound updateOutgoingData],
    _sent100: false,
    _expect_continue: false,
    req: [Circular *2],
    locals: [Object: null prototype] {},
    [Symbol(kCapture)]: false,
    [Symbol(kNeedDrain)]: false,
    [Symbol(corked)]: 0,
    [Symbol(kOutHeaders)]: [Object: null prototype] { 'x-powered-by': [Array] }
  },
  body: {},
  route: Route {
    path: '/*',
    stack: [
      [Layer], [Layer], [Layer], [Layer],
      [Layer], [Layer], [Layer], [Layer],
      [Layer], [Layer], [Layer], [Layer],
      [Layer], [Layer], [Layer], [Layer],
      [Layer], [Layer], [Layer], [Layer],
      [Layer], [Layer], [Layer], [Layer],
      [Layer], [Layer], [Layer], [Layer],
      [Layer], [Layer], [Layer], [Layer],
      [Layer], [Layer], [Layer]
    ],
    methods: {
      acl: true,
      bind: true,
      checkout: true,
      connect: true,
      copy: true,
      delete: true,
      get: true,
      head: true,
      link: true,
      lock: true,
      'm-search': true,
      merge: true,
      mkactivity: true,
      mkcalendar: true,
      mkcol: true,
      move: true,
      notify: true,
      options: true,
      patch: true,
      post: true,
      pri: true,
      propfind: true,
      proppatch: true,
      purge: true,
      put: true,
      rebind: true,
      report: true,
      search: true,
      source: true,
      subscribe: true,
      trace: true,
      unbind: true,
      unlink: true,
      unlock: true,
      unsubscribe: true
    }
  },
  [Symbol(kCapture)]: false,
  [Symbol(kHeaders)]: {
    autorization: 'adios',
    'user-agent': 'PostmanRuntime/7.26.8',
    accept: '*/*',
    'postman-token': '00ee319c-9b5d-4478-a316-bb954035b858',
    host: 'localhost:3001',
    'accept-encoding': 'gzip, deflate, br',
    connection: 'keep-alive'
  },
  [Symbol(kHeadersCount)]: 14,
  [Symbol(kTrailers)]: null,
  [Symbol(kTrailersCount)]: 0,
  [Symbol(RequestTimeout)]: undefined
}
{
  autorization: 'adios',
  'user-agent': 'PostmanRuntime/7.26.8',
  accept: '*/*',
  'postman-token': '00ee319c-9b5d-4478-a316-bb954035b858',
  host: 'localhost:3001',
  'accept-encoding': 'gzip, deflate, br',
  connection: 'keep-alive'
}
```

Métodos que tiene `requestOptions`

| attribute   | type   | description                                                                                   |
| ----------- | ------ | --------------------------------------------------------------------------------------------- |
| req         | Object | The (request object)[http://expressjs.com/en/api.html#req].                                   |
| res         | Object | The (response object)[http://expressjs.com/en/api.html#res].                                  |
| method      | string | Contains a string corresponding to the HTTP method of the request: GET, POST, PUT, and so on. |
| dir         | string | The directory of selected response                                                            |
| preferences | Object | The preferences object                                                                        |

Métodos que tiene `serverOptions`

```md
options.restPath Type: String Default value: './rest'

A string value that defines the path to the rest API folder.

options.dirName Type: String

A string value that defines the root directory (\_\_dirname).

options.title Type: String Default value: Api mock server

A string value that defines the title.

options.version Type: Number Default value: 1

A number value that defines the Rest API version.

options.urlBase Type: String Default value: http://localhost:3001

A string value that defines the mock Rest API url.

options.urlPath Type: String Default value: /rest/v1

A string value that defines the path for the mock Rest API.

options.port Type: Number Default value: 3001

A number value that defines the application port.

options.uiPath Type: string Default value: /

A string value that defines the path for the node-mock-server UI.

options.privateKey Type: String

A string value that defines the path to the private key for ssl.

options.certificate Type: String

A string value that defines the path to the ssl certificate.

options.funcPath Type: String|Array Optional

A string or array that define the location of the response functions.

options.headers Type: Object Default value: {}

A object that define the global response headers. Will add the given headers to
all responses.

options.contentType Type: String Default value: application/json

A string that define the header "Content-Type".

options.accessControlExposeHeaders Type: String or function Default value:
X-Total-Count

A string that define the header "Access-Control-Expose-Headers". If a function
is used, it will be called with the request object as the only parameter.

options.accessControlAllowOrigin Type: String or function Default value: \*

A string that define the header "Access-Control-Allow-Origin". If a function is
used, it will be called with the request object as the only parameter.

options.accessControlAllowMethods Type: String or function Default value: GET,
POST, PUT, OPTIONS, DELETE, PATCH, HEAD

A string that define the header "Access-Control-Allow-Methods". If a function is
used, it will be called with the request object as the only parameter.

options.accessControlAllowHeaders Type: String or function Default value:
origin, x-requested-with, content-type

A string that define the header "Access-Control-Allow-Headers". If a function is
used, it will be called with the request object as the only parameter.

options.accessControlAllowCredentials Type: String or function Default value:
true

A string that define the header "Access-Control-Allow-Credentials". If a
function is used, it will be called with the request object as the only
parameter.

options.middleware Type: Object Optional

A object including the middleware functions. Read middleware.md for details.

options.expressMiddleware Type: Array<Function<Array<path: string, callback:
Function>>> Optional

A array of functions that returns the express app.use arguments. Read express
middleware documentation for details. examples:

expressMiddleware: [ function () { return ['/public',
express.static('/public')]; } ] expressMiddleware: [ function () { return
['/public', function (req, res, next) {}]; } ] expressMiddleware: [ function ()
{ return [function (req, res, next) {}] } ] expressMiddleware: [ function () {
return function (req, res, next) {}; } ] options.swaggerImport Type: Object
Optional

A object that define the swagger import.

options.swaggerImport.protocol Type: String Default value: http

A string that used to define the protocol for the swagger import curl.

options.swaggerImport.authUser Type: String Optional

A string that define the basic auth user for the swagger import curl.

options.swaggerImport.authPass Type: String Optional

A string that define the basic auth password for the swagger import curl.

options.swaggerImport.host Type: String Required

A string that define the host for the swagger import curl.

options.swaggerImport.port Type: String Default value: 80

A string that define the port for the swagger import curl.

options.swaggerImport.path Type: String Default value: ``

A string that define the path for the swagger import curl.

options.swaggerImport.yaml Type: Boolean Default value: false

A flag that toggles whether the swagger file should be treated as a YAML file
(otherwise: JSON).

options.swaggerImport.dest Type: String Required

A string that defines the destination path for the swagger import.

options.swaggerImport.replacePathsStr Type: String Default value: ``

A string that defines the part of the swagger imported methods path which should
be removed.

options.swaggerImport.createErrorFile Type: Boolean Default value: true

A boolean to decide to create an expected response error file or not.

options.swaggerImport.createEmptyFile Type: Boolean Default value: true

A boolean to decide to create an expected response empty file or not.

options.swaggerImport.overwriteExistingDescriptions Type: Boolean Default value:
true

A boolean to decide to replace an old description with the new (imported)
description or not.

options.swaggerImport.responseFuncPath Type: String

A string that defines the location of the imported response functions.

options.swaggerImport.agent Type: HttpProxyAgent|HttpsProxyAgent Optional

An agent to reach a swagger url outside a corporate proxy.

options.customDTOToClassTemplate Type: String Optional

A string that define the path to the custom DTO to class template. template

options.open Type: Boolean Optional

A boolean to decide to open the UI after start or not.

options.optionsFallbackPath Type: String Optional

A string that defines and enables the options fallback. This allows you to
define a fallback for every options call except there is one defined for the
affected endpoint.

options.useTrailingSlashes Type: Boolean Optional

A boolean to decide to use trailing slashes in URL if your endpoints always
ending with it.
```

Se puede hacer que de distintos archivos de success. ejemplo:

(ver
node-mock-server-poc/demo/demo/rest/products/#{productCode}/GET/mock/success.json)

```json
<%
	var data = {};

	switch (params.productCode) {
		case '1':
			data = response['success-1'];
			break;
		case '2':
			data = response['success-2'];
			break;
		default:
			data = response['success-default'];
			break;
	}

%>

<%-JSON.stringify(data);%>
```

La versión 5.1.0 de fakerjs no la pilla los template de ejs (no he indagado), la
otra opción es picarlos en funciones dentro de la carpeta `func`

> IMPORTANTE!!!: Se ha tenido que cambiar el path porque no es capaz de
> reconocer un valor dinámico al principio. Se ha dejado el path de
> `oauth/{aspsp}`, en vez del de `{apsps}/oauth`

Para que pase por el middleware hace falta que se seleccione el checkbox de
middleware. Hay un modo de que sea por defecto.

# Mock response validation

- Use the UI to validate each mock response against the schema.
- It's also possible to validate all responses by clicking "Validate all mock
  responses" in UI.
- In case of you using params (query or path params) in mock data, you can
  simulate them by adding an
  [".request_data.json"](/demo/rest/products/%23%7BproductCode%7D/GET/mock/.request_data.json)
  file.

Si tiene varios segmentos dinámicos, no se puede (o no he visto forma) de que
pase por un middleware

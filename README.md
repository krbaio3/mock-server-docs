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

## node-mock-server-poc

[node-mock-server](https://github.com/smollweide/node-mock-server)

instalación:

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

## wiremock npm

Revisar esta [issue](https://github.com/tomakehurst/wiremock/issues/514)

Hay dos wrapper, uno parece descontinuado, y otro activo.

Descontinuado: [wiremock-js](https://github.com/stratouklos/wiremock-js)

[wiremock](https://github.com/tomasbjerre/wiremock-npm)

Wrapper de wiremock para nodejs. Ocupa 13,5Mb. Usa node-jre

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
  `error-401.json` Si un parámetro está mal informado,

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
  un archivo `response.txt` que es el que mockea la respuesta (es muy simple)

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

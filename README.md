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
    response.json(
        swaggerDocument
    );
});

app.listen({
    port: 4444,
},() => console.info('Ejecutando Swagger en "/swagger.json" puerto: 4444'));
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

-----

Copiar el swagger.yaml de ejemplo y ponerlo [aqui](https://editor.swagger.io/). Pasarlo a JSON y guardarlo en [swagger-server](#projecto-swagger-server) como `swagger.json`. Parece ser, que `node-mock-server` no se lleva bien con el `$ref`. Dejarlo sin ello

ejecutamos `npm start`

Volvemos al proyecto [node-mock-server-poc](#node-mock-server-poc)

Configuramos en el `index.js` la parte de swagger

```js
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
```

Importamos el swagger desde la interfaz gráfica.

Una vez importado el swagger, pasamos el Validate All Mocks Response

En el botón de DTO's, vemos que se nos han generado los objetos que teníamos en los swagger. Al pulsar sobre ellos, nos da la opción de generar el código que queramos seleccionando unos checkBox

Están vacías las respuestas y los errores
Abrir issue a node-mock-server
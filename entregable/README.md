# MOCK SERVER

<!-- TOC -->

- [MOCK SERVER](#mock-server)
  - [Proyecto node-mock-server-poc](#proyecto-node-mock-server-poc)
    - [instalación](#instalación)
    - [inicialización](#inicialización)
    - [Importar desde Swagger](#importar-desde-swagger)
  - [Projecto swagger-server](#projecto-swagger-server)
    - [Otras Pruebas](#otras-pruebas)
      - [Download current stable 2.x.x branch (Swagger and OpenAPI version 2)](#download-current-stable-2xx-branch-swagger-and-openapi-version-2)
  - [Ejecución](#ejecución)
    - [index.js](#indexjs)
    - [Árbol de directorio](#árbol-de-directorio)
    - [Responses](#responses)
    - [Middleware](#middleware)
    - [Headers](#headers)
    - [Colecciones](#colecciones)
  - [Ejemplo hello](#ejemplo-hello)

<!-- /TOC -->

Después de haber estado revisando los distintos mock-server que hay Open-Source,
se ha decidido usar
[node-mock-server](https://github.com/smollweide/node-mock-server).

Para ver las distintas opciones sobre las que se ha estado trabajando, se pueden
ver en [este apartado](./descartado.md)

## Proyecto node-mock-server-poc

[node-mock-server](https://github.com/smollweide/node-mock-server)

Características:

- Node 6
- Mock Server UI
- Swagger import
- ES6 or ES6+Flow
- faker v4.1.0

Se van a describir los pasos para una instalación completa. Una vez realizada,
no hace falta hacerlo cada vez que se quiera modificar cualquier parte generada
de código, implementación de mocks, etc, pero si se require hacer una
`importación de swagger`, habrá que realizar los pasos correspondientes a esa
parte.

### instalación

```bash
$ npm install node-mock-server --save-dev
Done!
```

### inicialización

```bash
$ node node_modules/node-mock-server/init

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

### Importar desde Swagger

Para poder importar el proyecto, es necesario tenerlo en formato `json`. Para
ello, de forma provisional se debe de copiar el `swagger` y pegarlo
[aqui](https://editor.swagger.io/). En el menú, seleccionar la opción de pasarlo
a JSON y guardarlo en [swagger-server](#projecto-swagger-server) como
`swagger.json`. Intentar dejarlo lo más sencillo posible, ya que al hacer varias
referencias a `$ref`, las herramientas externas que usa `node-mock-server`, no
son capaz de resolverlas muy acertadamente.

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

Es muy simple. Lo único que se hace con esto es levantar un servidor `ExpressJS`
para poder server el archivo `swagger.json`.

### Otras Pruebas

Pruebas

- [issue](https://stackoverflow.com/questions/34733253/converting-a-swagger-yaml-file-to-json-from-the-command-line)

#### Download current stable 2.x.x branch (Swagger and OpenAPI version 2)

```
wget https://repo1.maven.org/maven2/io/swagger/swagger-codegen-cli/2.4.17/swagger-codegen-cli-2.4.17.jar -O swagger-codegen-cli.jar

java -jar swagger-codegen-cli.jar help

swagger-codegen generate -i swagger.yaml -l swagger
```

## Ejecución

En el proyecto [swagger-server](#projecto-swagger-server), ejecutamos
`npm start`.

Volvemos al proyecto [node-mock-server-poc](#node-mock-server-poc)

Configuramos en el `index.js` la parte de swagger

### index.js

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

Para ver más opciones, ver en [Middleware](#middleware)

Desde la ventana del navegador que se ha abierto, seleccionamos desde la
interfaz gráfica la opción de UI Importar swagger.

Una vez importado el swagger, pasamos el _Validate All Mocks Response_. No
debería de dar fallo, ya que crea un esqueleto vacío.

En el botón de DTO's, vemos que se nos han generado los objetos que teníamos en
los swagger. Al pulsar sobre ellos, nos da la opción de generar el código que
queramos seleccionando unos checkBox. Esto sirve como ayuda a la implementación.

Ahora, si nos fijamos en la estructura de carpeta que nos ha generado:

### Árbol de directorio

```tree
.
├── mock
│   ├── func
│   │   └── prueba.js
│   ├── func-imported
│   │   ├── RequestBodySignature.js
│   │   ├── RequestRefreshToken.js
│   │   ├── ResponseRedirectSuccessfully.js
│   │   ├── ResponseRefreshSuccessfully.js
│   │   ├── ResponseRejected.js
│   │   ├── ResponseSuccessfully.js
│   │   ├── _authURL.js
│   │   ├── _errorArray.js
│   │   ├── _errorObject.js
│   │   ├── _id.js
│   │   ├── _refreshToken.js
│   │   └── _type.js
│   ├── index.js
│   └── rest
│       ├── _DTO
│       │   ├── RequestRefreshToken.json
│       │   ├── ResponseRedirectSuccessfully.json
│       │   ├── ResponseRefreshSuccessfully.json
│       │   └── ResponseRejected.json
│       ├── _collections
│       ├── hello
│       │   └── #{param}
│       │       └── GET
│       │           ├── desc.json
│       │           ├── mock
│       │           │   ├── empty.json
│       │           │   ├── error.json
│       │           │   ├── response-data.json
│       │           │   ├── response.txt
│       │           │   └── success.json
│       │           ├── request_schema.json
│       │           └── response_schema.json
│       ├── oauth
│       │   ├── #uri#{aspsp}
│       │   │   └── GET
│       │   │       ├── desc.json
│       │   │       ├── mock
│       │   │       │   ├── empty.json
│       │   │       │   ├── error.json
│       │   │       │   ├── response.txt
│       │   │       │   └── success.json
│       │   │       ├── request_schema.json
│       │   │       └── response_schema.json
│       │   ├── #{aspsp}
│       │   │   └── GET
│       │   │       ├── desc.json
│       │   │       ├── mock
│       │   │       │   ├── empty.json
│       │   │       │   ├── error.json
│       │   │       │   ├── response.txt
│       │   │       │   └── success.json
│       │   │       ├── request_schema.json
│       │   │       └── response_schema.json
│       │   └── #{aspsp}#token
│       │       └── POST
│       │           ├── desc.json
│       │           ├── mock
│       │           │   ├── empty.json
│       │           │   ├── error.json
│       │           │   └── success.json
│       │           ├── request_schema.json
│       │           └── response_schema.json
│       └── preferences.json
├── package-lock.json
└── package.json
```

**Carpeta func**: es una carpeta para crear nuestras funciones de mocks, podemos
crear archivos js como este:

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

**Carpeta func-imported** es autogenerada cuando se importa el YAML, si vamos a
importar más YAML, deberemos de mover las funciones que queramos (o las que
modifiquemos) de la carpeta `func-imported` a la `func`. No se recomienda poner
el path de `respcnseFuncPath` en `funcPath`

> Después de una "importación de swagger" encontrará un montón de funciones
> simuladas, si se define `options.swaggerImport.responseFuncPath`. Estas
> "funciones simuladas" se sobrescribirán para cada importación, para asegurarse
> de que pueda utilizarlas, copie las que necesite en su directorio habitual de
> "funciones simuladas" (options.funcPath). Lo que significa que no debe agregar
> `options.swaggerImport.responseFuncPath` a `options.funcPath` para evitar
> conflictos.

**Carpeta rest/\_collections**: Es donde se guardan los archivos de las
[colecciones](#colecciones) codificadas.

**Carpeta rest/\_DTO**: Se encuentran los archivos DTO generados por la
Aplicación.

**Carpeta rest/{END_POINT}**: Carpeta de ruta que contiene todos los archivos de
configuración para que acceda el mock-server

**Carpeta rest/{END_POINT}/mock**: Carpeta donde se encuentran los archivos de
respuesta que nuestro mock-server usará.

### Responses

- Responses: para error 500, crear `error.json`, para error 401,
  `error-401.json` Si un parámetro está mal informado.

  > Para una respuesta de error, el código de estado HTTP predeterminado es 500,
  > pero puede especificar un código de estado diferente agregando como sufijo
  > el nombre de su respuesta de error el código de estado apropiado, como
  > error-423.json.

- Se puede solicitar enviar un `json` de respuesta específica, indicándo en los
  `headers` (key: `_expected`, value: json_de_respuesta)

- Se puede usar la interfaz de usuario para configurar la respuesta esperada
  para cada llamada.

- Si un parámetro de ruta dinámica está vacío o posición errónea, la respuesta
  será un "400 bad request".

- Responses "dinámicas": Se puede hacer que según un parámetro dado en la url,
  por ejemplo, de distintos archivos de success. Ejemplo:

```json
<%
 let data = {};

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

### Middleware

- Para validaciones tipo OPTIONS ver el
  [Middleware](https://github.com/smollweide/node-mock-server/blob/master/doc/readme-middleware.md)

- Para exponer contenido estático en la carpeta public, se hace con la propiedad
  [expressMiddleware](https://github.com/smollweide/node-mock-server/blob/master/doc/readme-express-middleware.md)

Se puede usar los middleware para que hagan la función de validaciones de
headers. Hay que codificar la lógica para validarlas, y en caso necesario,
incluir cada archivo de respuesta de validación. Es decir, si por ejemplo,
tenemos que validar tres tipos de cabeceras distintas, tendremos que codificar
las tres validaciones, y el archivo `.json` correspondiente a su respuesta.

En el [index.js](#indexjs), incluir este middleware a modo de ejemplo:

```js
 middleware: {
    '/rest/hello/#{param}/GET'(serverOptions, requestOptions) {
      console.log('serverOptions', JSON.stringify(serverOptions, null, 4));

      console.log('requestOptions', JSON.stringify(requestOptions.req, null, 4));

      return 'response-data';
    },
  },
```

Para la url: http:[dominio]:[puerto]/[prefix]/[version]/hell0/[param] (como por
ejemplo, <http://localhost:3001/api/v1/hello/jorge?test=pepe>), obtenemos el
valor de `serverOptions` en este [fichero](./serverOptions.md), y la salida de
`requestOptions.req` en este otro [fichero](./requestOptions.md). Se han
separado para no "ensuciar" este documento.

Métodos que tiene `requestOptions`

| atributo    | tipo   | descripción                                                                              |
| ----------- | ------ | ---------------------------------------------------------------------------------------- |
| req         | Objeto | El (objeto de solicitud) [http://expressjs.com/en/api.html#req].                         |
| res         | Objeto | El (objeto de respuesta) [http://expressjs.com/en/api.html#res].                         |
| method      | cadena | Contiene una cadena correspondiente al método HTTP de la solicitud: GET, POST, PUT, etc. |
| dir         | cadena | El directorio de la respuesta seleccionada                                               |
| preferences | Objeto | El objeto de preferencias                                                                |

Métodos que tiene `serverOptions` (opciones que tiene el [index.js](#indexjs))

**options.restPath**

Tipo: `String`

Valor predeterminado:`'./rest'`

Un valor de cadena que define la ruta a la carpeta de la API rest.

**options.dirName**

Tipo: `String`

Un valor de cadena que define el directorio raíz (\_\_dirname).

**options.title**

Tipo: `String`

Valor predeterminado:`Api mock server`

Un valor de cadena que define el título.

**options.version**

Tipo: `Número`

Valor predeterminado:`1`

Un valor numérico que define la versión de la API Rest.

**options.urlBase**

Tipo: `String`

Valor predeterminado:`http://localhost:3001`

Un valor de cadena que define la URL de la API de descanso simulada.

**options.urlPath**

Tipo: `String`

Valor predeterminado:`/rest/v1`

Un valor de cadena que define la ruta para la API de Rest simulada.

**options.port**

Tipo: `Número`

Valor predeterminado:`3001`

Un valor numérico que define el puerto de la aplicación.

**options.uiPath**

Tipo: `String`

Valor predeterminado:`/`

Un valor de cadena que define la ruta de la IU del servidor simulado de nodo.

**options.privateKey**

Tipo: `String`

Un valor de cadena que define la ruta a la clave privada para ssl.

**options.certificate**

Type: `String`

Un valor de cadena que define la ruta al certificado ssl.

**options.funcPath**

Tipo: `String | Array`

Opcional

Una cadena o matriz que define la ubicación de las funciones de respuesta.

**options.headers**

Tipo: `Object`

Valor predeterminado:`{}`

Un objeto que define los encabezados de respuesta global. Agregará los
encabezados dados a todas las respuestas.

**options.contentType**

Tipo: `String`

Valor predeterminado:`application/json`

Una cadena que define el encabezado "Content-Type".

**options.accessControlExposeHeaders**

Tipo: `String` o `function` Valor predeterminado: `X-Total-Count`

Una cadena que define el encabezado" Access-Control-Expose-Headers ". Si se
utiliza una función , se llamará con el objeto de solicitud como único
parámetro.

**options.accessControlAllowOrigin**

Tipo: `String` o `function`

Valor predeterminado: `*`

Una cadena que define el encabezado "Access-Control-Allow-Origin". Si se utiliza
una función , se llamará con el objeto de solicitud como único parámetro.

**options.accessControlAllowMethods**

Tipo: `String` o `function`

Valor predeterminado: `GET, POST, PUT, OPTIONS, DELETE, PATCH, HEAD`

Una cadena que define el encabezado" Access-Control-Allow-Methods ". Si se
utiliza una función , se llamará con el objeto de solicitud como único
parámetro.

**options.accessControlAllowHeaders**

Tipo: `String` o `function`

Valor predeterminado: `origin, x-required-with, content-type`

Una cadena que define el encabezado" Access-Control-Allow-Headers ". Si una
función se utiliza, se llamará con el objeto de solicitud como único parámetro.

**options.accessControlAllowCredentials**

Tipo: `String` o `function`

Valor predeterminado: `true`

Una cadena que define el encabezado" Access-Control-Allow-Credentials ". Si se
utiliza una función , se llamará con el objeto de solicitud como único
parámetro.

**options.middleware**

Tipo: `Object`

Opcional

Un objeto que incluye las funciones de middleware. Lea [middleware.md]
(#middleware.md) para obtener detalles.

**options.expressMiddleware**

Tipo: `Array<Function<Array<path: string, callback: Function>>>`

Opcional

Un array de funciones que devuelve los argumentos de `app.use`. Lea la
[documentación de middleware express]
(<http://expressjs.com/en/api.html#app.use>) para obtener más detalles.
ejemplos:

- `expressMiddleware: [function () {return ['/ public', express.static ('/ public')]; }]`
- `expressMiddleware: [function () {return ['/ public', function (req, res, next) {}]; }]`
- `expressMiddleware: [function () {return [function (req, res, next) {}]}]` \*`expressMiddleware: [function () {return function (req, res, next) {}; }]`

**options.swaggerImport**

Type:`Object`

Opcional

Un objeto que define la importación swagger.

**options.swaggerImport.protocol**

Tipo: `String`

Valor predeterminado:`http`

Una cadena que solía definir el protocolo para el curl de importación swagger.

**options.swaggerImport.authUser**

Type: `String`

Opcional

Una cadena que define el usuario de autenticación básico para el rizo de
importación swagger.

**options.swaggerImport.authPass**

Tipo: `String`

Opcional

Una cadena que define la contraseña de autenticación básica para la importación
de swagger.

**options.swaggerImport.host**

Tipo: `String`

Requerido

Una cadena que define el host para la importación swagger.

**options.swaggerImport.port**

Tipo: `String`

Valor predeterminado:`80`

Una cadena que define el puerto para la importación swagger.

**options.swaggerImport.path**

Tipo: `String`

Valor predeterminado:``

Una cadena que define la ruta para la importación swagger.

**options.swaggerImport.yaml**

Tipo: `Boolean`

Valor predeterminado: `false`

Una marca que alterna si el archivo swagger debe tratarse como un archivo YAML
(de lo contrario: JSON).

**options.swaggerImport.dest**

Tipo: `String`

Requerido

Una cadena que define la ruta de destino para la importación swagger.

**options.swaggerImport.replacePathsStr**

Tipo: `String`

Valor predeterminado:``

Una cadena que define la parte de la ruta de métodos importados de Swagger que
debe eliminarse.

**options.swaggerImport.createErrorFile**

Tipo: `Boolean`

Valor predeterminado: `true`

Un booleano para decidir si se crea un archivo de error de respuesta esperada o
no.

**options.swaggerImport.createEmptyFile**

Tipo: `Boolean`

Valor predeterminado:`true`

Un booleano para decidir si crear un archivo vacío de respuesta esperada o no.

**options.swaggerImport.overwriteExistingDescriptions**

Tipo: `Boolean`

Valor predeterminado:`true`

Un booleano para decidir reemplazar una descripción antigua con la descripción
nueva (importada) o no.

**options.swaggerImport.responseFuncPath**

Tipo: `String`

Una cadena que define la ubicación de las funciones de respuesta importadas.

**options.swaggerImport.agent**

Tipo: `HttpProxyAgent | HttpsProxyAgent`

Opcional

Un agente para llegar a una URL arrogante fuera de un proxy corporativo.

**options.customDTOToClassTemplate**

Tipo: `String`

Opcional

Una cadena que define la ruta al DTO personalizado a la plantilla de clase.
[plantilla](https://github.com/smollweide/node-mock-server/blob/master/src/templates/dto_es6flow.ejs)

**options.open**

Tipo: `Boolean`

Opcional

Un booleano para decidir abrir la IU después del inicio o no.

**options.optionsFallbackPath**

Tipo: `String`

Opcional

Una cadena que define y habilita las opciones de respaldo. Esto le permite
definir una reserva para cada llamada de opciones, excepto que haya una definida
para el punto final afectado.

**options.useTrailingSlashes**

Tipo: `Boolean`

Opcional

Un valor booleano para decidir usar barras diagonales finales en la URL si sus
puntos finales siempre terminan con ella.

### Headers

- Para agregar cabeceras, se pueden crear de manera global para todas las
  peticiones, en el [index.js](#indexjs) con el atributo `headers`, o dentro de
  cada carpeta `mock` con un fichero `json`:
  `{error|success|error-401|...}.headers.json` ,
  [aquí](https://github.com/smollweide/node-mock-server/blob/master/doc/readme-response-header.md)
  está la documentación oficial

- Para cambiar entre respuestas sin cambiar la configuración, leer esta
  [issue](https://github.com/smollweide/node-mock-server/issues/148)

### Colecciones

- Collections: cuando se le indica que tiene que dar una respuesta fija, por
  ejemplo, de errores, se crea dentro de la carpeta `rest/{PATH}/{METODO}/mock`
  un archivo `response.txt` que es el que mockea la respuesta (es muy simple,
  crea el archivo con lo que tiene que responder)

## Ejemplo hello

En la carpeta mock, se pueden poner las respuestas que va a tener el servicio,
como se ha descrito en un punto anterior.

La librería lo que nos crea es un esqueleto vacío, donde poder codificar
nuestras respuestas. Por ejemplo, podemos crear, tanto desde la Interfaz gráfica
de la aplicación como desde el código, un nuevo archivo, ue podemos llamarle
como queramos, salvo si queremos que tenga un comportamiento específico como el
descrito [aquí](#crear-errores-y-success). En este ejemplo, se ha agregado la
respuesta `response-data.json`.

Es recomendable que con cada nueva importación de swagger o desarrollo de
cualquier nuevo `mock`, codifiquemos el archivo `request_schema.json` y el
`response_schema.json` (este último, no he conseguido hacer que se ejecute con
cada petición)

Cuando se agregue un archivo nuevo (response => success), se debe de ejecutar
las validaciones (descritas en el `response_schema.json`). Si cuando se ejecuten
las validaciones (pulsar Validate dentro de la modal, para seleccionar el
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

El fichero que se encentra en
`node-mock-server-poc/mock/rest/hello/#{param}/GET/request_schema.json`, es un
validador

Las validaciones no tienen en cuenta las cabeceras. Para ello hay que codificar
un [middleware](#middleware) para hacer la validación ahí, pero hay que tener en
cuenta que el fichero de salida que se indique, no puede ser modificado.

Cuando se entra dentro de una descripción, nos muestra una pantalla con tres
opciones:

- mock
- response
- request

**Mock**: seleccionamos la respuesta que nos devolverá mock-server. Para ver qué
datos nos devolverá en la `response`, podemos darle al botón de `open`, y nos
abrirá en el editor la respuesta que se enviará. Ejemplo de respuesta:

```json
{
  "detail": "<%=faker.lorem.sentence()%>",
  "url": "<%=faker.internet.url()%>",
  "oauth2URL": "<%=faker.internet.url()%>/cb?code=<%=faker.random.alphaNumeric(22)%>&state=<%=faker.random.alphaNumeric(3)%>",
  "faker": "<%=faker.random.alphaNumeric(3)%>",
  "require": "<%=require%>",
  "dirname": "<%=__dirname%>",
  "id": "<%=faker.random.uuid();%>",
  "hello": "<%=params.param%>",
  "email": "<%-faker.internet.email();%>",
  "body": "<%-JSON.stringify(body);%>",
  "query": "<%-JSON.stringify(query);%>",
  "param": "<%-JSON.stringify(params);%>",
  "cards": [<%-JSON.stringify(faker.helpers.createCard());%>
  ],
  "prueba": <%-prueba(headers);%>
}
```

**Response**: Breve descripción del `status` y del `type`. Nos da la opción de
mostrar el Schema en otra pantalla y del tipo de respuesta que va a enviar (lo
que se le haya indicado en el `response_schema.json`)

**Request**: Breve descripción de la `request` que espera. Nos da la opción de
mostrar el Schema en otra pantalla y del tipo de respuesta que va a enviar (lo
que se le haya indicado en el `request_schema.json`)

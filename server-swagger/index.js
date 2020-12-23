const express = require('express');
const app = express();
const swaggerUi = require('swagger-ui-express');
const swaggerDocument = require('./swagger.json');

app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocument));

app.listen({
    port: 4444,
},() => console.info('Ejecutando Swagger en "/api-docs" puerto: 4444'));
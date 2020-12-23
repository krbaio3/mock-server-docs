const express = require('express');
const app = express();
const swaggerUi = require('swagger-ui-express');
const swaggerDocument = require('./swagger.json');

// app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocument));

app.get('/swagger.json', (request, response) => {
    const event = new Date(Date.now());
    console.log('Envío de swagger ', event.toLocaleTimeString('es-ES'));
    response.json(
        swaggerDocument
    );

    // response.send(JSON.stringify(swaggerDocument))
});

app.listen({
    port: 4444,
},() => console.info('Ejecutando Swagger en "/swagger.json" puerto: 4444'));
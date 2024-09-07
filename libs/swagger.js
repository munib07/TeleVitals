// swagger.js
const swaggerJsdoc = require('swagger-jsdoc');
const swaggerUi = require('swagger-ui-express');

const options = {
    definition: {
        openapi: '3.0.0',
        info: {
            title: 'Swagger Express API',
            version: '1.0.0',
            description: 'Televitals backend cooked in API documentation',
        },
        components: {
            securitySchemes: {
                Authorization: {
                    type: 'http',
                    scheme: 'bearer',
                    bearerFormat: 'JWT',
                }
            }
        },
        security: [{
            Authorization: []
        }],
        servers: [
            {
                url: 'http://localhost:3001',
                description: 'Development server',
            },
            {
                url: 'https://https://televitals.onrender.com/',
                description: 'Production server',
            }
        ]
    },

    apis: ['./routes/*.js'], // Path to your API routes
};

const specs = swaggerJsdoc(options);

module.exports = {
    specs,
    swaggerUi,
};
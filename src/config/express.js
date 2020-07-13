const express = require('express');
const bodyParser = require('body-parser');
const morgan = require('morgan');
const cors = require('cors');
const path = require('path');
const helmet = require('helmet');
// const favicon = require('serve-favicon');

const app = express();
const {
    log,
    env,
} = require('./vars');

const logger = require('./logger');

const Router = require('../api/routes/v1');

const error = require('../api/middlewares/error');


/**
 * Middlewares
 */

// favicon
if (env === 'production') {
    // app.use(favicon(path.join(__dirname, '../../public/images/knowllipop_icon.png')));
}

// wear helmet for APIs
app.use(helmet());

// receive data in body of request
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
    extended: true,
}));

// enable CORS in Header
app.use(cors());

// logger for APIs accesses
app.use(morgan(log, { stream: logger.stream }));


// static folders
app.use('/uploads', express.static(path.join(__dirname, '../api/uploads')));
app.use('/v1/docs', express.static(path.join(__dirname, '../../docs/api')));

/**
 * App Routers
 */
app.use(Router);

/**
 * Global error handlers
 */

// if error is not an instance of APIError, convert it
app.use(error.converter);

// handle 404 Not Found error
app.use(error.notFound);

// add a global error handler to catch the error responsed
app.use(error.handler);

module.exports = {
    app,
};

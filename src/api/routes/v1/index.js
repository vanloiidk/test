const Router = require('express').Router();

const testRouter = require('./test.router');


const { env } = require('../../../config/vars');

/**
 * APIs doc - Only available in development environment
 * @dev
 */
if (env === 'development') {
    Router.use('/v1/api/test', testRouter);
}


/**
 * API routes
 */

module.exports = Router;

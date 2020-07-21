const Router = require('express').Router();

const {
    testController,
} = require('../../controllers/test.controller');

/**
 * @api {get} /v1/api/test/ Get testing route
 * @apiVersion 1.0.0
 * @apiSampleRequest http://localhost:5000/v1/api/test
 * 
 * @apiName FirstTest
 * @apiGroup Test
 * @apiHeader authorization
 * 
 * 
 */
Router.route('/').get(
    testController
)


module.exports = Router;
const httpStatus = require('http-status');
const Model = require('../models');
const request = require('request');


module.exports.testController = async (req, res, next) => {
    try {
        const {
            sqlConn,
        } = req.app.locals;

        const {
            test,
        } = new Model({ sqlConn });

        const [rows, fields] = await test.getData("sample data");

        return res.status(httpStatus.OK)
            .json({
                code: httpStatus.OK,
                message: 'responseMessage',
                result: rows,
            })
            .end();

    } catch (error) {
        next(error);
    }
}

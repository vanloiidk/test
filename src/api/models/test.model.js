
const httpStatus = require('http-status');
const APIError = require('../utils/APIError');
const _ = require('lodash');


class Test {
    constructor(sqlConn) {
        this.table = 'quanhuyen';
        this.sqlConn = sqlConn;

    }

    async getData(data) {
        try {
            const [rows, fields] = await this.sqlConn.execute('select ?+? as sum', [2, 2]);

            return [rows, fields];
        } catch (error) {
            throw new APIError({
                message: 'failed on getting data',
                status: httpStatus.INTERNAL_SERVER_ERROR,
                stack: error.stack,
                isPublic: false,
                errors: error.errors,
            })
        }
    }

}
module.exports = Test;

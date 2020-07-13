
const httpStatus = require('http-status');
const APIError = require('../utils/APIError');
const { ObjectID } = require('mongodb');
const _ = require('lodash');


class Test {
    constructor(db) {
        this.collection = db.collection('test');

    }

}
module.exports = Test;

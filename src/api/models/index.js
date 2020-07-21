const Test = require('./test.model')
class Model {
    constructor({ sqlConn }) {
        this.test = new Test(sqlConn);
    }
}

module.exports = Model;

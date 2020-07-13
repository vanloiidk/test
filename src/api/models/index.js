const Test = require('./test.model')
class Model {
    constructor({ db }) {
        this.test = new Test(db);
    }
}

module.exports = Model;

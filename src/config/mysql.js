const Promise = require('bluebird');
const {
    Logger,
} = require('mongodb');

const {
    database,
    env,
} = require('./vars');

const logger = require('./logger');

const {
    uri,
    name,
} = database;

const options = {
    useUnifiedTopology: true,
    promiseLibrary: Promise,
};

if (env === 'development') {
    // Set debug level
    Logger.setLevel('debug');
    Logger.filter('class', ['Db']);
}
const mysql = require('mysql2/promise');
module.exports.connect = async () => {
    try {

        const conn = await mysql.createConnection(
            {
                host: 'db4free.net',
                user: 'trongthoai17',
                password: 'Thoaideptrai@123',
                database: 'qlytreem'
            }
        );

        logger.info(`Database connection established (${name})`);



        return conn;
    } catch (error) {
        console.log(error);
        logger.error('Error connecting to mysql');
        process.exit(0);
    }
};


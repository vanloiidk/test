const Promise = require('bluebird');
const {
    MongoClient,
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

console.log(uri);

const mongoClient = new MongoClient(uri, options);

let dbInstance;
module.exports.connect = async () => {
    try {
        if (mongoClient.isConnected()) {
            return dbInstance;
        }

        const client = await mongoClient.connect();
        logger.info(`Database connection established (${name})`);

        const db = client.db(name);
        dbInstance = db;


        return db;
    } catch (error) {
        console.log(error);
        logger.error('Error connecting to MongoDb');
        process.exit(0);
    }
};

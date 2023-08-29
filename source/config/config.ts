import dotenv from 'dotenv';

dotenv.config();

const MONGO_OPTIONS = {
    useNewUrlParser: true,
    useUnifiedTopology: true
};

const MONGO_USERNAME = process.env.MONGO_USERNAME || '';
const MONGO_PASSWORD = process.env.MONGO_PASSWORD || '';
const MONGO_HOST = process.env.MONGO_URL || 'cluster0.ackufh3.mongodb.net/';

const MONGO ={
    host: MONGO_HOST,
    username: MONGO_USERNAME,
    password:MONGO_PASSWORD,
    options: MONGO_OPTIONS,
    url: `mongodb+srv://${MONGO_USERNAME}:${MONGO_PASSWORD}@${MONGO_HOST}`
}


const SERVER_HOSTNAME = process.env.SERVER_HOSTNAME || 'localhost';
const SERVER_PORT = process.env.SERVER_PORT || 1337;

const SERVER = {
    hostname: SERVER_HOSTNAME,
    port : SERVER_PORT     
}

const config = {
    mongo: MONGO,
    server: SERVER
}

export default config;
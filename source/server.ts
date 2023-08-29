import http from 'http';
import bodyParser from 'body-parser';
import express from 'express';
import logging from './config/logging';
import config from './config/config';
import bookRoutes from './routes/book';
import mongoose, { ConnectOptions } from 'mongoose';

const NAMESPACE = 'Server';
const router = express();
//https://youtu.be/lNqaQ0wEeAo?t=357
//www.youtube.com/watch?v=lNqaQ0wEeAo
https: mongoose
    .connect(config.mongo.url, config.mongo.options as ConnectOptions)
    .then((result) => {
        logging.info(NAMESPACE, 'connected to mongoDB!');
    })
    .catch((error) => {
        logging.error(NAMESPACE, error.message, error);
    });

/** Logging the request */
router.use((req, res, next) => {
    logging.info(NAMESPACE, `METHOD - [${req.method}], URL - [${req.url}], IP -[${req.socket.remoteAddress}]`);
    res.on('finish', ()=>{
        logging.info(NAMESPACE, `METHOD - [${req.method}], URL - [${req.url}], IP -[${req.socket.remoteAddress}], STATUS [$res.statusCode]`);
    })
    next();
});

router.use(bodyParser.urlencoded({extended:false}));
router.use(bodyParser.json());
 
router.use((req, res, next)=>{
    res.header('Access-Control-Allow-Origin', '*');
    res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept, Authorization');

    if(req.method == 'option')
    {
        res.header('Access-Control-Allow-Methods', 'GET PATCH DELETE POST PUT');
        return res.status(200).json({});
    }
    next();
});

/** Routes */
router.use('/api/books', bookRoutes);

/** Error handling */
router.use((req, res, next)=>{
    const error = new Error('not found');

    return res.status(404).json({
        message : error.message
    });
    
});

const httpServer = http.createServer(router);
httpServer.listen(config.server.port, ()=> logging.info(NAMESPACE, `Server running on  ${config.server.hostname}:${config.server.port}`));
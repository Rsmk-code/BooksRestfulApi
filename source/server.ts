import http from 'http';
import bodyParser from 'body-parser';
import express from 'express';
import logging from './config/logging';
import config from './config/config';
import bookRoutes from './routes/book';
import authorRoutes from './routes/author'
import mongoose from 'mongoose';

const NAMESPACE = 'Server';
const router = express();

https: mongoose
    .connect(config.mongo.url, config.mongo.options)
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

router.use(bodyParser.urlencoded({ extended: true }));
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
router.use('/api/authors', authorRoutes)

/** Error handling */
router.use((req, res, next)=>{
    const error = new Error('not found');

    return res.status(404).json({
        message : error.message
    });
    
});

const httpServer = http.createServer(router);
httpServer.listen(config.server.port, ()=> logging.info(NAMESPACE, `Server running on  ${config.server.hostname}:${config.server.port}`));
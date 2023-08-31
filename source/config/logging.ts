
const getTimeStamp = (): string =>{
    return new Date().toISOString();
};

const info = (namespace: String, message: String, object?: any)=>{
    if(object)
    {
        console.warn(`[${getTimeStamp()}] [INFO] [${namespace}]: ${message}`,object);
    }
    else
    {
        console.warn(`[${getTimeStamp()}][INFO][${namespace}]: ${message}`);
    }
}

const warn = (namespace: String, message: String, object?: any)=>{
    if(object)
    {
        console.log(`[${getTimeStamp()}] [WARN] [${namespace}]: ${message}`,object);
    }
    else
    {
        console.log(`[${getTimeStamp()}][WARN][${namespace}]: ${message}`);
    }
}

const error = (namespace: String, message: String, object?: any)=>{
    if(object)
    {
        console.error(`[${getTimeStamp()}] [ERROR] [${namespace}]: ${message}`,object);
    }
    else
    {
        console.error(`[${getTimeStamp()}][ERROR][${namespace}]: ${message}`);
    }
}

const debug = (namespace: String, message: String, object?: any)=>{
    if(object)
    {
        console.debug(`[${getTimeStamp()}] [DEBUG] [${namespace}]: ${message}`,object);
    }
    else
    {
        console.debug(`[${getTimeStamp()}][DEBUG][${namespace}]: ${message}`);
    }
}

export default {
    info,
    warn,
    error,
    debug
}
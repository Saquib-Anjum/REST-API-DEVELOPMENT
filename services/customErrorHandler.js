class customErrorHandler extends Error {
    constructor(status,msg){
this.status = status;
this.message = msg;
    }

    static alreadyExist(message){
     return new customErrorHandler(409,message)
    }
}

export default customErrorHandler;
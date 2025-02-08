class customErrorHandler extends Error {
    constructor(status,msg){
        super()
this.status = status;
this.message=msg;
    }

    static alreadyExist(message){
     return new customErrorHandler(409,message)
    }

    static wrongCrdentials(message="User name or Password is Wrong"){
        return new customErrorHandler(401,message)
       }

       static unAuthorized(message="unAuthorized"){
        return new customErrorHandler(401,message)
       }

       static notFound(message="user not Found"){
        return new customErrorHandler(404,message)
       }
}

export default customErrorHandler;
const ValidationError = require('sequelize').ValidationError

class ErrorHandler extends Error {
    constructor(statusCode, message, error) {
        super();
        if(error instanceof ValidationError){
            let messages = [];
            error.errors.forEach((error) => {
                messages.push(error.message)
            });
            this.statusCode = 400;
            this.message = messages;
        }else{
            this.statusCode = statusCode;
            this.message = message;
        }
        
        this.error = error && error.hasOwnProperty('stack') ? error.stack : null;
    }
}

const handleError = (err, res) => {
    const { statusCode, message, error } = err;
    logger.error(`${message}\t STACKTRACE: ${error}`)
    res.status(statusCode).json({
        status: "error",
        statusCode,
        message,
        error
    });
};


module.exports = {
    ErrorHandler,
    handleError
}
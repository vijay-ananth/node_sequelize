const path = require('path')
const dir = p => path.join(__dirname, p)
module.exports = {
    development: {
        file: {
            level:'',
            filename:"",
            handleExceptions:'',
            json:'',
            maxsize:'', 
            maxFiles:'',
            colorize:''
        },
        console: {
            level: '',
            handleExceptions:'',
            json:'',
            colorize:''
        }
    },
    production: {
        file: {
            level:'',
            filename:'',
            handleExceptions:'',
            json: '',
            maxsize:'',
            maxFiles:'',
            colorize:''
        },
        console: {
            level:'',
            handleExceptions:'',
            json:'',
            colorize:''
        }
    },
    staging: {
        file: {
            level: '',
            filename:'',
            handleExceptions:'',
            json:'',
            maxsize:'', 
            maxFiles:'',
            colorize:''
        },
        console: {
            level: '',
            handleExceptions:'',
            json:'',
            colorize:''
        }
    }
}
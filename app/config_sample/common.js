module.exports = {
    development: {
        sequelize: {
            username: '',
            password: '',
            database: '',
            port: "",
            host: '',
            dialect: '',
            logging: '',
            logQueryParameters: ''
        },
      
        api_root: '',
    
    },
    staging: {
        sequelize: {
            username: '',
            password: '',
            database: '',
            port: "",
            host: '',
            dialect: '',
            logging: '',
            logQueryParameters: ''
        },
        api_root: '',
      
    },
    production: {
        sequelize: {
            username: '',
            password: '',
            database: '',
            port: "",
            host: '',
            dialect: '',
            pool: {
                max: ''
            },
            logging: '',
            logQueryParameters: ''
        },
        api_root: '',
    }
}
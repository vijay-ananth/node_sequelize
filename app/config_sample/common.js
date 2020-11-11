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
        // redis: {
        //   host: 'localhost',
        //   port: '6379',
        //   prefix: 'zoprent-keys-',
        //   expiry: 900
        // },
        api_root: '',
        // vendorSearcher: {
        //   host: 'http://localhost:3000',
        //   url: '/api/search.json',
        //   searchDetail: '/api/details',
        //   reindex: '/api/reindex'
        // }
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
        // vendorSearcher: {
        //   host: 'http://localhost:7000',
        //   url: '/api/search.json',
        //   searchDetail: '/api/details',
        //   reindex: '/api/reindex'
        // }
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
                max: 25
            },
            logging: '',
            logQueryParameters: ''
        },
        // redis: {
        //   host: 'localhost',
        //   port: '6379',
        //   prefix: 'zoprent-keys-',
        //   expiry: 900
        // },
        api_root: '',
        // vendorSearcher: {
        //   host: 'http://139.59.6.10',
        //   url: '/api/search.json',
        //   searchDetail: '/api/details',
        //   reindex: '/api/reindex'
        // }
    }
}
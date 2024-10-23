export default {
    db: {
        host: process.env.DB_HOST,
        port: process.env.DB_PORT,
        database: process.env.DB_NAME,
        user: process.env.DB_USER,
        password: process.env.DB_PASSWORD,
    },
    blockchain: {
        network: 'mainnet',
        port: 443,
    },
    api: {
        baseUrl: 'https://api.yourdomain.com/api',
    },
    logging: {
        level: 'info',
    },
};

import dotenv from 'dotenv';
import developmentConfig from './env/development';
import productionConfig from './env/production';

dotenv.config();

const environment = process.env.NODE_ENV || 'development';

const config = {
    development: developmentConfig,
    production: productionConfig,
};

export default config[environment];

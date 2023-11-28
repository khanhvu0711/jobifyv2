const { Sequelize } = require('sequelize');
require('dotenv').config();

const database = process.env.DB_NAME;
const username = process.env.DB_USER;
const password = process.env.DB_PASSWORD;
const host = process.env.DB_HOST;

const sequelize = new Sequelize(database, username, password, {
  host: host,
  dialect:
    /* one of 'mysql' | 'postgres' | 'sqlite' | 'mariadb' | 'mssql' | 'db2' | 'snowflake' | 'oracle' */

    'mysql',
  dialectOptions: {
    timezone: '+07:00',
  },
});

const dbConnect = async () => {
  try {
    await sequelize.authenticate();
    console.log('Connect Database successfully');
  } catch {
    console.error('unable to connect database');
  }
};

export default dbConnect;

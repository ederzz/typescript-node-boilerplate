"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const sequelize_1 = require("sequelize");
const config = require("config");
const mysqlConfig = config.get('mysql');
const { db, userName, password, host, dialect } = mysqlConfig;
class MysqlDb {
    constructor() {
        this.sequelize = new sequelize_1.Sequelize(db, userName, password, {
            host,
            dialect,
            pool: {
                max: 5,
                min: 0,
                acquire: 30000,
                idle: 10000
            }
        });
    }
    testConnection() {
        this.sequelize
            .authenticate()
            .then(() => {
            console.log('Connection has been established successfully.');
        })
            .catch(err => {
            console.log('Unable to connect to the database:', err);
        });
    }
}
exports.default = new MysqlDb();

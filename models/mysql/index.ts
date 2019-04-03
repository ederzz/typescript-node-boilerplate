import { Sequelize, Dialect } from 'sequelize'
import * as config from 'config'

const mysqlConfig: {
    db: string,
    userName: string,
    password: string,
    host: string,
    dialect: Dialect
} = config.get('mysql')

const {
    db,
    userName,
    password,
    host,
    dialect
} = mysqlConfig

class MysqlDb {
    public sequelize: Sequelize

    constructor() {
        this.sequelize = new Sequelize(db, userName, password, {
            host,
            dialect,
            operatorsAliases: false,
            pool: {
                max: 30,
                min: 0,
                acquire: 30000,
                idle: 10000
            },
            timezone: "+08:00",
            logging: false
        })
    }

    testConnection() {
        this.sequelize
            .authenticate()
            .then(() => {
                console.log('Connection has been established successfully.')
            })
            .catch(err => {
                console.log('Unable to connect to the database:', err)
            })
    }
}

export default new MysqlDb()
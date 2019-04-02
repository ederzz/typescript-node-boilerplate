import {
    Model, DataTypes
} from 'sequelize'
import mysqlDb from './index'

class Student extends Model {
    public id!: number
    public name!: string
    public age!: number
}

Student.init({
    id: {
        type: new DataTypes.INTEGER(),
        primaryKey: true,
        autoIncrement: true
    },
    name: {
        type: new DataTypes.STRING(),
        allowNull: false
    },
    age: {
        type: new DataTypes.INTEGER(),
        allowNull: false
    }
}, {
    tableName: 'students',
    sequelize: mysqlDb.sequelize
})

export {
    Student
}
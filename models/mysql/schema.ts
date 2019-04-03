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
        type: new DataTypes.STRING(10),
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

class Project extends Model {
    public id!: number
    public projectName!: string
    public projectCycle!: number
    public type!: string
}

Project.init({
    id: {
        type: new DataTypes.INTEGER(),
        primaryKey: true,
        autoIncrement: true
    },
    projectName: {
        type: new DataTypes.STRING(20),
        allowNull: false
    },
    projectCycle: {
        type: new DataTypes.INTEGER(),
        allowNull: false
    },
    type: {
        type: new DataTypes.STRING(20),
        allowNull: false
    }
}, {
    tableName: 'projects',
    sequelize: mysqlDb.sequelize
})

Student.hasMany(Project)

export {
    Student,
    Project
}
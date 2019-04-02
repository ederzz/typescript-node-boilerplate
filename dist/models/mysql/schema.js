"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const sequelize_1 = require("sequelize");
const index_1 = require("./index");
class Student extends sequelize_1.Model {
}
exports.Student = Student;
Student.init({
    id: {
        type: new sequelize_1.DataTypes.INTEGER(),
        primaryKey: true,
        autoIncrement: true
    },
    name: {
        type: new sequelize_1.DataTypes.STRING(),
        allowNull: false
    },
    age: {
        type: new sequelize_1.DataTypes.INTEGER(),
        allowNull: false
    }
}, {
    tableName: 'students',
    sequelize: index_1.default.sequelize
});

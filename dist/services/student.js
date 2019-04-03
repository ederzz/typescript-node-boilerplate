"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const schema_1 = require("../models/mysql/schema");
const utils_1 = require("../utils");
function createStudent(data) {
    console.log(data);
    return schema_1.Student.create(data);
}
exports.createStudent = createStudent;
function createProject(data) {
    return schema_1.Project.create(data);
}
exports.createProject = createProject;
function getStudents() {
    throw utils_1.genErrObj({
        status: 500,
        message: '错误发生'
    });
    return schema_1.Student.findAll({
        order: [
            ['updatedAt', 'DESC']
        ],
        offset: 0,
        limit: 1,
        include: [
            {
                model: schema_1.Project
            }
        ]
    });
}
exports.getStudents = getStudents;

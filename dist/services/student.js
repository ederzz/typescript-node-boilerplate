"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const schema_1 = require("../models/mysql/schema");
function createStudent(data) {
    return schema_1.student.create(data, {
        include: [
            {
                association: 'projects'
            }
        ]
    });
}
exports.createStudent = createStudent;
function createProject(data) {
    return schema_1.project.create(data);
}
exports.createProject = createProject;
function getStudents({ pageNo, pageSize }) {
    return schema_1.student.findAll({
        order: [
            ['updatedAt', 'DESC']
        ],
        offset: (pageNo - 1) * pageSize,
        limit: pageSize,
        include: [
            {
                model: schema_1.project,
                as: 'projects'
            }
        ]
    }).then(ret => ({
        list: ret,
        pageNo,
        pageSize
    }));
}
exports.getStudents = getStudents;

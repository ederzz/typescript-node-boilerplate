"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const schema_1 = require("../models/mysql/schema");
function createStudent(data) {
    return schema_1.Student.create(data);
}
exports.createStudent = createStudent;

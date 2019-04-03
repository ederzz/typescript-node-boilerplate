import {
    Student,
    Project
} from '../models/mysql/schema'

interface IStudent {
    name: string,
    age: number
}

interface IProject {
    projectName: string,
    projectCycle: number,
    type: string
}

export function createStudent(data: IStudent) {
    console.log(data)
    return Student.create(data)
}

export function createProject(data: IProject) {
    return Project.create(data)
}

export function getStudents() {
    return Student.findAll({
        order: [
            ['updatedAt', 'DESC']
        ],
        offset: 0,
        limit: 1,
        include: [
            {
                model: Project
            }
        ]
    })
}
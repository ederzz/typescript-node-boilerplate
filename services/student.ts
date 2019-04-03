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
    return Student.create(data)
}

export function createProject(data: IProject) {
    return Project.create(data)
}

export function getStudents({
    pageNo,
    pageSize
}: {
    pageNo: number,
    pageSize: number
}) {
    return Student.findAll({
        order: [
            ['updatedAt', 'DESC']
        ],
        offset: (pageNo - 1) * pageSize,
        limit: pageSize,
        include: [
            {
                model: Project
            }
        ]
    }).then(ret => ({
        list: ret,
        pageNo,
        pageSize
    }))
}
import {
    student,
    project
} from '../models/mysql/schema'

interface IStudent {
    name: string,
    age: number,
    projects: IProject[]
}

interface IProject {
    projectName: string,
    projectCycle: number,
    type: string
}

export function createStudent(data: IStudent) {
    return student.create(data, {
        include: [
            {
                association: 'projects'
            }
        ]
    })
}

export function createProject(data: IProject) {
    return project.create(data)
}

export function getStudents({
    pageNo,
    pageSize
}: {
    pageNo: number,
    pageSize: number
}) {
    return student.findAll({
        order: [
            ['updatedAt', 'DESC']
        ],
        offset: (pageNo - 1) * pageSize,
        limit: pageSize,
        include: [
            {
                model: project,
                as: 'projects'
            }
        ]
    }).then(ret => ({
        list: ret,
        pageNo,
        pageSize
    }))
}
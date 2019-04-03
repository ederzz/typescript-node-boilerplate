import {
    Student,
    Project
} from './schema'

export async function syncDb () {
    await Student.sync({
        force: true
    })
    await Project.sync({
        force: true
    })
}

syncDb()
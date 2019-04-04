import {
    student,
    project
} from './schema'

export async function syncDb () {
    await student.sync({
        force: true
    })
    await project.sync({
        force: true
    })
}

syncDb()
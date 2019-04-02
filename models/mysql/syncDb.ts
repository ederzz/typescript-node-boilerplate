import {
    Student
} from './schema'

export async function syncDb () {
    await Student.sync({
        force: true
    })
}

syncDb()
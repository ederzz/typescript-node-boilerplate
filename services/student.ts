import {
    Student
} from '../models/mysql/schema'

interface IStudent {
    name: string,
    age: number
}

export function createStudent(data: IStudent) {
    return Student.create(data)
}
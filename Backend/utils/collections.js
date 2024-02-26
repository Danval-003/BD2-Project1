import mongoose from 'mongoose'
import { Student } from '../models/studentModel.js'
import { Teacher } from '../models/teacherModel.js'
import { School } from '../models/SchoolModel.js'
import { Grade } from '../models/gradeModel.js'
import { Course } from '../models/courseModel.js'

export let getCollection = (colName) => {
    if(colName.toUpperCase() === 'STUDENTS') {
        return Student
    } else if(colName.toUpperCase() === 'TEACHERS') {
        return Teacher
    } else if(colName.toUpperCase() === 'SCHOOLS') {
        return School
    } else if(colName.toUpperCase() === 'GRADES') {
        return Grade
    } else if(colName.toUpperCase() === 'COURSES') {
        return Course
    } else {
        throw new Error('Collection does not exist.')
    }
}
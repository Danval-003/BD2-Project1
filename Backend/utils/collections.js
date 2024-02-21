import mongoose from 'mongoose'
import { Student } from '../models/studentModel.js'
import { Teacher } from '../models/teacherModel.js'
import { School } from '../models/SchoolModel.js'
import { Grade } from '../models/gradeModel.js'
import { Course } from '../models/courseModel.js'

export let getCollection = (colName) => {
    if(colName.toUpperCase() === 'STUDENT') {
        return Student
    } else if(colName.toUpperCase() === 'TEACHER') {
        return Teacher
    } else if(colName.toUpperCase() === 'SCHOOL') {
        return School
    } else if(colName.toUpperCase() === 'GRADE') {
        return Grade
    } else if(colName.toUpperCase() === 'COURSE') {
        return Course
    } else {
        throw new Error('Collection does not exist.')
    }
}
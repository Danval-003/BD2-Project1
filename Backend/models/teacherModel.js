import mongoose from "mongoose";

const courseSchema = new mongoose.Schema({
    idCourse: String,
    name: String,
    year: Number,
    idGrade: String,
    gradeSection: String,
    performance: Number,
});

const teacherSchema = new mongoose.Schema({
    gender: String,
    fullName: String,
    age: Number,
    courses: [courseSchema],
    admissionYear: Number,
    idSchool: String
});

export const Teacher = mongoose.model('Teacher', teacherSchema);
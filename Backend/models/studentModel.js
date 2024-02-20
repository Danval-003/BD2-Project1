import mongoose from "mongoose";

const courseSchema = new mongoose.Schema({
    idGrade: String,
    section: String,
    idCourse: String,
    year: Number,
    percentGrade: Number
});

const studentSchema = new mongoose.Schema({
    gender: String,
    fullName: String,
    age: Number,
    eca: Boolean,
    admissionYear: Number,
    gradeSection: String,
    idGrade: String,
    courses: [courseSchema],
    ETA_IL: String
});

export const Student = mongoose.model('Student', studentSchema)
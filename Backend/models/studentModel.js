import mongoose from "mongoose";

const courseSchema = new mongoose.Schema({
    idGrade: String,
    section: String,
    idCourse: String,
    year: Number,
    percentGrade: Number,
});

const schoolSchema = new mongoose.Schema({
    idSchool: String,
    location: {
        State: String,
        City: String,
        Street: String
    }
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
    idSchool: schoolSchema
});

export const Student = mongoose.model('Student', studentSchema)
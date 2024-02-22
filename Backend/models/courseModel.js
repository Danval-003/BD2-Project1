import mongoose from "mongoose";

const courseSchema = new mongoose.Schema({
    idCourse: String,
    name: String,
}, {
    versionKey: false
});

export const Course = mongoose.model('Course', courseSchema);
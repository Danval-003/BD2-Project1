import mongoose from "mongoose";

const courseSchema = new mongoose.Schema({
    idCourse: String,
    name: String,
});

export const Course = mongoose.model('Course', courseSchema);
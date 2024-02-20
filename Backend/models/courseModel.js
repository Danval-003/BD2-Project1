import mongoose from "mongoose";

const courseSchema = new Schema({
    idCourse: String,
    name: String,
});

export const Course = mongoose.model('Course', courseSchema);
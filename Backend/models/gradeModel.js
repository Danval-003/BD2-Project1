import mongoose from "mongoose";

const gradeSchema = new mongoose.Schema({
    idGrade: String,
    name: String,
});

export const Grade = mongoose.model('Grade', gradeSchema);
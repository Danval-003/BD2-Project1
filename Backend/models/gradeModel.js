import mongoose from "mongoose";

const gradeSchema = new mongoose.Schema({
    idGrade: String,
    name: String,
}, {
    versionKey: false
});

export const Grade = mongoose.model('Grade', gradeSchema);
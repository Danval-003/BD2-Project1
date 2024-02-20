import mongoose from "mongoose";

const gradeSchema = new Schema({
    idGrade: String,
    name: String,
});

export const Grade = mongoose.model('Grade', gradeSchema);
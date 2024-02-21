import mongoose from "mongoose";

const schoolSchema = new mongoose.Schema({
    idSchool: String,
    location: {
        State: String,
        City: String,
        Street: String
    }
});

export const School = mongoose.model('School', schoolSchema);


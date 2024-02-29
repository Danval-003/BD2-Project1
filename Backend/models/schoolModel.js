import mongoose from "mongoose";

const schoolSchema = new mongoose.Schema({
    idSchool: String,
    location: {
        State: String,
        City: String,
        Street: String
    }
}, {
    versionKey: false
});

export const School = mongoose.model('School', schoolSchema);
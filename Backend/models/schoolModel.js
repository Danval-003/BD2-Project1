import mongoose from "mongoose";

const schoolSchema = new Schema({
    idSchool: String,
    location: {
        State: String,
        City: String,
        Street: String
    }
});

export const SchoolLocation = mongoose.model('School', schoolSchema);


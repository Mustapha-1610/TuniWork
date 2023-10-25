import mongoose from "mongoose";
const Schema = mongoose.Schema;
const adminSchema = new Schema({
    Name: {
        type: String,
        required: true,
    },
    Surname: {
        type: String,
        required: true,
    },
    Username: {
        type: String,
        required: true,
    },
    AdminCode: {
        type: String,
        required: true,
    },
    PhoneNumber: {
        type: Number,
        required: true,
    },
    Email: {
        type: String,
        required: true,
        unique: true,
    },
    Password: {
        type: String,
        required: true,
    },
    ProfilePicture: {
        type: String,
        default:
            "https://firebasestorage.googleapis.com/v0/b/tunibids.appspot.com/o/Windows_10_Default_Profile_Picture.svg.png?alt=media&token=e7aca30d-6eea-45ff-8522-db048fcb8c38",
    },
    ActionHistory:{
        type: String,
        default: null,
    },

    AccountVerficiationStatus: {
        type: Boolean,
        default: false,
    },
});


export default mongoose.model("admin", adminSchema);

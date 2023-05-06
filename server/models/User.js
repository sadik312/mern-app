import mongoose from "mongoose";

const userSchema = new mongoose.Schema(
    {
        firstName: {
            type: String, // has to be type string
            required: true, // must be required
            min: 2, // min value must be at least 2
            max: 50, // cannot surpass max value of 50
        },
        lastName: {
            type: String,
            required: true,
            min: 2,
            max: 50
        },
        email: {
            type: String,
            required: true,
            max: 50,
            unique: true // cannot have duplicate emails
        },
        password: {
            type: String, 
            default: "",
        },
        friends: {
            type: Array,
            default: []
        },
        picturePath: {
            type: String,
            default: ""
        },
        location: String,
        occupation: String,
        viewedProfile: Number,
        impressions: Number
    },
    { timestamps: true }
)

const User = mongoose.model("User", userSchema);
export default User;
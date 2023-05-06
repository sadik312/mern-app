import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import User from "../models/User.js";

/* Register User */
const register = async (req, res) => {
    try{
        const {
            firstName,
            lastName,
            email,
            password,
            picturePath,
            friends,
            location,
            occupation
        } = req.body; // destructuring parameters from req.body
        
        const salt = await bcrypt.genSalt(); // generate random salt from bcrypt to encrypt password
        const passwordHash = await bcrypt.hash(password, salt); // password with salt 
        
        const newUser = new User({
            firstName,
            lastName,
            email,
            password: passwordHash,
            picturePath,
            friends,
            location,
            occupation,
            viewedProfile: Math.floor(Math.random() * 1000), // providing random values
            impressions: Math.floor(Math.random() * 1000) // providing random values
        });
        const savedUser = await newUser.save();
        res.status(201).json(savedUser); // if no errors, send user status 201 (something has been created) so frontend can receive this response
    } catch (err) {
        res.status(500).json({ error: err.message }); // if errors, send error message with whatever error msg mongoDB has returne. (Frontend will get this message)
    }
};

/* Loggin In */
const login = async (req, res) => {
    // user validation
    try{
        const { email, password } = req.body; // destructure email and pwd from req.body
        const user = await User.findOne({ email: email }); // use mongoose to find the one that has the specified email
        if (!user) return res.status(400).json({msg: "User does not exist" });

        const isMatch = await bcrypt.compare(password, user.password); // use bcrypt to compare password just sent and password saved in db
        if (!isMatch) return res.status(400).json({ msg: "Invalid credentials" });
        
        const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET);
        delete user.password; // delete pwd so it doesn't get sent back to the frontend to make sure it's kept safe
        res.status(200).json({ token, user });
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
}

export default {
    register,
    login
}
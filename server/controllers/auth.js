import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import User from "../models/User.js";

/* Register User */
export const register = async (req, res) => {
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
}
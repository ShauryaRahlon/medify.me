import User from "../Models/user.model.js";
import bcrypt from "bcryptjs";
import jwt from 'jsonwebtoken';
import dotenv from "dotenv";
dotenv.config();

function generateOTP() {
    // Generate number between 100000 and 999999
    return Math.floor(100000 + Math.random() * 900000);
}

export const signup = async (req, res) => {
    try {
        const { email, password, userName } = req.body;

        if (!email || !password || !userName) {
            return res.status(400).json({ error: "Please fill all the fields" });
        }

        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRegex.test(email)) {
            return res.status(400).json({ error: "Invalid email format" });
        }

        const checkUser = await User.findOne({ email });
        if (checkUser) {
            return res.status(400).json({ error: "User with same email already exists" });
        }

        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(password, salt);

        const newUser = new User({
            userName,
            email,
            password: hashedPassword,
        });

        await newUser.save();

        return res.status(201).json({
            message: "User created successfully. Please verify your email with the OTP.",
            userId: newUser._id,
            email: newUser.email,
        });

    } catch (error) {
        console.log("Error in signup functionality");
        return res.status(500).json({error : "Internal Server problem"})
    }
}

export const login = async (req, res) => {
    try {
        const {email, password} = req.body;
        if(!email || !password){
            return res.status(400).json({error : "Please fill all the fields"})
        }

        const user = await User.findOne({email});
        
        if(!user){
            return res.status(404).json({error : "User not found"})
        }

        const isPasswordCorrect = await bcrypt.compare(password, user?.password || "");

        if(isPasswordCorrect === false){
            return res.status(401).json({error : "Invalid credentials"})
        }

        const token = jwt.sign({ _id: user._id }, process.env.MY_SECRET, { expiresIn: '1h' });
        return res.status(200).json({
            message : "Login successful",
            token
        })
    } catch (error) {
        console.log("Error in login functionality");
        return res.status(500).json({error : "Internal Server problem"})
    }
}
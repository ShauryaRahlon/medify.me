import dotenv from "dotenv";
import User from "../Models/user.model.js";
import bcrypt from "bcryptjs";
import nodemailer from "nodemailer";
import jwt from "jsonwebtoken";
// import fileUpload from "express-fileupload";
// import { GoogleGenerativeAI } from "@google/generative-ai";

// Load environment variables
dotenv.config();

// const genAI = new GoogleGenerativeAI(process.env.API_KEY);

// Generate OTP
function generateOTP() {
    return Math.floor(100000 + Math.random() * 900000);
}

// Signup Controller
export const signup = async (req, res) => {
    try {
        const { userName, email, password } = req.body;

        // Validate input fields
        if (!userName || !email || !password) {
            return res.status(400).json({ error: "All fields are required" });
        }

        // Validate email format
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRegex.test(email)) {
            return res.status(400).json({ error: "Invalid email format" });
        }

        // Check if user already exists
        const checkUser = await User.findOne({ email });
        if (checkUser) {
            return res.status(400).json({ error: "User with same email already exists" });
        }

        // Generate OTP
        const otp = generateOTP();

        // Configure email transport
        const transporter = nodemailer.createTransport({
            service: "Gmail",
            auth: {
                user: "medify.ai.me@gmail.com",
                pass: "quljzzdizhluxvjt",
            },
        });

        // Send OTP email
        console.log(otp);
        try {
            await transporter.sendMail({
                from: "medify.ai.me@gmail.com",
                to: email,
                subject: "Your OTP for Signup",
                text: `Your OTP for signup is ${otp}.`,
                html: `
                    <h2>Welcome!</h2>
                    <p>Your OTP for signup is: <strong>${otp}</strong></p>
                    <p>If you didn't request this OTP, please ignore this email.</p>
                `,
            });
        } catch (error) {
            console.log(error, "error in sending OTP");
            return res.status(500).json({ error: "Failed to send OTP email" });
        }

        // Hash password
        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(password, salt);

        // Create user
        const newUser = new User({
            userName,
            email,
            password: hashedPassword,
            otp,
            isVerified: false,
        });

        await newUser.save();

        return res.status(201).json({
            message: "User created successfully. Please verify your email with the OTP.",
            userId: newUser._id,
            email: newUser.email,
        });
    } catch (error) {
        console.error("Error in signup:", error);
        return res.status(500).json({ error: "Internal Server Error" });
    }
};

// OTP Verification Controller
export const verifyOTP = async (req, res) => {
    try {
        const { email, otp } = req.body;

        if (!email || !otp) {
            return res.status(400).json({ error: "Email and OTP are required" });
        }

        const user = await User.findOne({ email });

        if (!user) {
            return res.status(404).json({ error: "User not found" });
        }

        if (user.isVerified) {
            return res.status(400).json({ error: "User is already verified" });
        }

        if (user.otp !== otp) {
            return res.status(400).json({ error: "Invalid OTP" });
        }

        user.isVerified = true;
        user.otp = undefined;
        await user.save();

        return res.status(200).json({ message: "Email verified successfully" });
    } catch (error) {
        console.error("Error in verifyOTP:", error);
        return res.status(500).json({ error: "Internal Server Error" });
    }
};

// Login Controller
export const login = async (req, res) => {
    try {
        const { email, password } = req.body;

        if (!email || !password) {
            return res.status(400).json({ message: "All fields are required." });
        }

        const checkUser = await User.findOne({ email });
        if (!checkUser) {
            return res.status(404).json({ message: "User not found." });
        }

        const isPasswordCorrect = await bcrypt.compare(password, checkUser.password || "");
        if (!isPasswordCorrect) {
            return res.status(401).json({ message: "Invalid email or password." });
        }

        const token = jwt.sign({ _id: checkUser._id }, process.env.MY_SECRET, { expiresIn: "1h" });

        return res.status(200).json({ message: "Login successful!", token });
    } catch (error) {
        console.error("Error in login:", error);
        return res.status(500).json({ message: "Internal Server Error" });
    }
};

// AI Handle Controller
// export const aiHandle = async (req, res) => {
//     try {
//         if (!req.files || !req.files.image) {
//             return res.status(400).send("No file uploaded.");
//         }

//         const image = req.files.image;
//         const imageBuffer = image.data;

//         const model = genAI.getGenerativeModel({ model: "models/gemini-1.5-pro" });

//         const result = await model.generateContent([
//             {
//                 inlineData: {
//                     data: imageBuffer.toString("base64"),
//                     mimeType: image.mimetype,
//                 },
//             },
//             "Medically analyze this image. If unrelated to the medical field, respond with Invalid image. Provide the response in a structured report format. Suggest precautions in bullet points if applicable.",
//         ]);

//         res.json({ report: result.response.text() });
//     } catch (error) {
//         console.error("Error in aiHandle:", error);
//         res.status(500).send("Error processing the image.");
//     }
// };

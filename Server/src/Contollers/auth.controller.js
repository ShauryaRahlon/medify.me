import User from "../Models/user.model.js";

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

        const newUser = new User({
            userName,
            email,
            password,
        });

        console.log(newUser);

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
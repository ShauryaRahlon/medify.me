import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import fs from "fs/promises";
import { GoogleGenerativeAI } from "@google/generative-ai";
import fileUpload from "express-fileupload";

// Load environment variables
dotenv.config();

// Validate API key
const API_KEY = process.env.GOOGLE_API_KEY;
if (!API_KEY) {
    throw new Error('GOOGLE_API_KEY is required in .env file');
}

const app = express();
const genAI = new GoogleGenerativeAI(API_KEY);

// Middleware
app.use(cors());
app.use(fileUpload({
    limits: { fileSize: 50 * 1024 * 1024 }, // 50MB max file size
    abortOnLimit: true
}));

// Endpoint for image captioning
app.post('/previewer', async (req, res) => {
    try {
        // Validate file upload
        if (!req.files?.image) {
            return res.status(400).json({ error: 'No image file uploaded' });
        }

        const image = req.files.image;
        if (!image.mimetype.startsWith('image/')) {
            return res.status(400).json({ error: 'Uploaded file must be an image' });
        }

        const imageBuffer = image.data;
        const model = genAI.getGenerativeModel({ model: 'gemini-1.5-pro' });

        const result = await model.generateContent([
            {
                inlineData: {
                    data: imageBuffer.toString('base64'),
                    mimeType: image.mimetype,
                }
            },
            'Medically Summarize this image'
        ]);

        const response = await result.response;
        res.json({ caption: response.text() });

    } catch (err) {
        console.error('Error processing image:', err);
        res.status(500).json({
            error: 'Error generating caption',
            details: process.env.NODE_ENV === 'development' ? err.message : undefined
        });
    }
});

const PORT = process.env.PORT2 || 7000;
app.listen(PORT, () => console.log(`Server running on port ${PORT} `));
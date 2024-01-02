import express from 'express';
import * as dotenv from 'dotenv';
import OpenAIApi from 'openai';

dotenv.config();

const router = express.Router();

// Set up OpenAI API configuration
const openaiConfig = {
  apiKey: process.env.OPENAI_API_KEY,
};
const openai = new OpenAIApi(openaiConfig);

router.route('/').get((req, res) => {
  res.status(200).json({ message: "Hello from DALL.E1" });
});

router.post("/", async (req, res) => {
  const { prompt } = req.body;
  try {
    const response = await openai.images.generate ({
      prompt,
      n: 1,
      size: "512x512",
    });
    res.send(response.data[0].url);
  } catch (err) {
    res.send(err.message);
  }
});

export default router;

import express from 'express';
import cors from 'cors';
import axios from 'axios';
import dotenv from 'dotenv';

dotenv.config();

const app = express();
const PORT = process.env.PORT || 5000;

app.use(cors());

app.get("/news/:country/:category/:page", async (req, res) => {
    const { country, category, page } = req.params || "us";
    console.log(`Fetching news for country: ${country}, category: ${category}, page: ${page}`);
    try {
        const response = await axios.get(
            `https://newsapi.org/v2/top-headlines?country=${country}&category=${category}&page=${page}&apiKey=${process.env.NEWS_API_KEY}`
        );
        res.json(response.data);
    } catch (error) {
        console.error("Error fetching news:", error.message);
        res.status(500).json({ error: "Failed to fetch news" });
    }
});

app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});
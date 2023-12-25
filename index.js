import express from "express";
import mongoose from "mongoose";
import dotenv from "dotenv";
import bodyParser from "body-parser";
import cors from "cors";
import { getShortUrl, shortenURL } from "./controllers/UrlController.js";

// Load environment variables from the .env file
dotenv.config();

// Define the port for the Express app
const port = process.env.PORT || 3000;

// Get the MongoDB URI from environment variables
const mongoUri = process.env.MONGO_URI || "mongodb+srv://aizaz060198:Ahmed6198%40@cluster0.iaiuzrt.mongodb.net";

// Check if MongoDB URI is provided
if (!mongoUri) {
  console.error("MongoDB URI not provided. Please check your environment variables.");
  process.exit(1);
}

// Create an instance of the Express app
const app = express();

// Use body-parser middleware for parsing incoming request bodies
app.use(bodyParser.urlencoded({ extended: true }));

// Enable CORS for all routes
app.use(cors());

// Connect to MongoDB using Mongoose
mongoose.connect(mongoUri, { useNewUrlParser: true, useUnifiedTopology: true });

// Serve static files from the "public" directory
app.use("/public", express.static(`${process.cwd()}/public`));

// Define a route to serve the main HTML page
app.get("/", function (req, res) {
  res.status(200).sendFile(process.cwd() + "/views/index.html");
});

// Define a route for shortening URLs (POST request)
app.post("/api/shorturl", shortenURL);

// Define a route for redirecting to the original URL based on short URL (GET request)
app.get("/api/:id", getShortUrl);

// Start the Express app and listen on the specified port
app.listen(port, () => {
  console.info(`App is listening at PORT ${port}`);
});

// Additional route for checking the health of the URL Shortener
app.get("/heartbeat", (req, res) => {
  res.status(200).send("URL Shortener is working.");
});

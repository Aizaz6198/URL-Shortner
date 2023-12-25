import { URL } from "url";
import dns from "dns";
import { URLModal } from "../models/URLSchema.js";

// Function to handle URL shortening
export const shortenURL = async (req, res) => {
  // Extract the original URL from the request body
  const original_url = req.body.url;

  try {
    // Validate the URL using the URL constructor
    const modifiedURL = new URL(original_url);

    // Check if the hostname is valid using DNS lookup
    await new Promise((resolve, reject) => {
      dns.lookup(modifiedURL.hostname, (err, address, family) => {
        if (err) {
          // Reject if the URL is invalid
          reject(new Error("Invalid URL"));
        } else {
          // Resolve if the URL is valid
          resolve();
        }
      });
    });

    // Check if the URL is already in the database
    const url = await URLModal.findOne({ original_url });

    if (url) {
      // If URL is already in the database, respond with the existing short URL
      res.status(201).json({
        short_url: url.short_url,
        original_url: url.original_url,
      });
    } else {
      // If URL is not in the database, generate a new short URL
      const data = await URLModal.find().exec();
      const newUrl = new URLModal({
        short_url: data.length + 1,
        original_url,
        urlId: data.length + 1,
        date: new Date(),
      });

      // Save the new URL to the database
      await newUrl.save();

      // Respond with the newly generated short URL
      res.status(201).json({
        short_url: data.length + 1,
        original_url,
      });
    }
  } catch (error) {
    // Handle errors and respond with an appropriate error message
    res.status(400).json({
      error: {
        message: error.message,
      },
    });
  }
};

// Function to handle redirection based on short URL
export const getShortUrl = async (req, res) => {
  try {
    // Find the original URL based on the provided urlId parameter
    const url = await URLModal.findOne({ urlId: req.params.id });

    if (url) {
      // If the URL is found, redirect to the original URL
      res.redirect(url.original_url);
    } else {
      // If the URL is not found, respond with an error message
      res.status(400).json({ error: "Wrong Format || URL not found" });
    }
  } catch (error) {
    // Handle errors and respond with an appropriate error message
    res.status(400).json({
      error: {
        message: error.message,
      },
    });
  }
};

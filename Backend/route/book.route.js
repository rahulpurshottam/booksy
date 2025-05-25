// book.route.js
import express from "express";
import Book from "../model/book.model.js"; // Adjust path
const router = express.Router();

router.get("/course", async (req, res) => {
  try {
    const books = await Book.find();
    res.json(books);
  } catch (err) {
    res.status(500).json({ message: "Error fetching books" });
  }
});
router.get("/", async (req, res) => {
  try {
    const books = await Book.find(); // or your actual query
    res.json(books);
  } catch (error) {
    res.status(500).json({ message: "Error fetching books", error });
  }
});

export default router;

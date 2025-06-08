const express = require("express");
const router = express.Router();
const Course = require("../models/Courses");
const authenticate = require("../middleware/authMiddleware");

router.post("/", authenticate, async (req, res) => {
    const {title, description, price } = req.body;
    const course = new Course({ title, description, price });
    await course.save();
    res.status(201).json(course);
});

router.get("/", async (req, res) => {
    const courses = await Course.find()
    res.json({ courses });
});

module.exports = router;
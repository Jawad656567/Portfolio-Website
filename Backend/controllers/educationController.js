const Education = require("../models/education");

// GET all education
const getEducation = async (req, res) => {
  try {
    const data = await Education.find().sort({ createdAt: -1 });

    res.json(data);
  } catch (err) {
    res.status(500).json({
      message: err.message,
    });
  }
};

// ADD education
const addEducation = async (req, res) => {
  try {
    const newEdu = new Education(req.body);

    const saved = await newEdu.save();

    res.status(201).json(saved);
  } catch (err) {
    res.status(400).json({
      message: err.message,
    });
  }
};

// UPDATE education
const updateEducation = async (req, res) => {
  try {
    const updated = await Education.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true }
    );

    res.json(updated);
  } catch (err) {
    res.status(400).json({
      message: err.message,
    });
  }
};

// DELETE education
const deleteEducation = async (req, res) => {
  try {
    await Education.findByIdAndDelete(req.params.id);

    res.json({
      message: "Deleted successfully",
    });
  } catch (err) {
    res.status(400).json({
      message: err.message,
    });
  }
};

module.exports = {
  getEducation,
  addEducation,
  updateEducation,
  deleteEducation,
};
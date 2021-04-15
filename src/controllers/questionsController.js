import asyncHandler from "express-async-handler";
import Questions from "../models/questions.model.js";

// @desc   Get all user
// @route  GEt /api/questions
// @access Private
const getAllQuestions = asyncHandler(async (req, res) => {
  const questions = await Questions.find({}).sort({ createdAt: -1 });
  if (questions) {
    res.json({
      code: 1,
      msg: "success",
      message: "Danh sách Question",
      data: questions,
    });
  } else {
    res.status(404);
    throw new Error("List Questions Not Found");
  }
});

export { getAllQuestions };

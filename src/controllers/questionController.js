import asyncHandler from "express-async-handler";
import Question from "../models/question.model.js";

// @desc   Fetch all questions
// @route  GET /api/questions
// @access Public
const getQuestions = asyncHandler(async (req, res) => {
  const questions = await Question.find({});
  res.send({
    code: 0,
    msg: "success",
    message: "List all questions",
    data: questions,
  });
});

// @desc   Fetch one Question
// @route  GET /api/questions/:id
// @access Public
const getQuestionById = asyncHandler(async (req, res) => {
    const question = await Question.findById(req.params.id);
    if (question) {
      res.send({
        code: 0,
        msg: "success",
        message: `Info Question`,
        data: chapter,
      });
    } else {
      res.status(404);
      throw new Error("Chapter not found");
    }
});

export {
  getQuestions,getQuestionById
};

import asyncHandler from "express-async-handler";
import Question from "../models/question.model.js";
import User from '../models/user.model.js'
import Chapter from '../models/chapter.model.js'

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

// @desc   Create one question
// @route  Post /api/questions/
// @access Public
const createQuestions = asyncHandler(async (req, res) => {
  const { title, chapter, result, answers, user, level } = req.body
  if (title && chapter && result && user && level) {
    let checkUser = await User.findById(user)
    if (checkUser) {
      let checkChapter = await Chapter.findById(chapter)
      if (checkChapter) {
        let question = new Question({
          title: title,
          answers: answers,
          result: result,
          level: level,
          chapter: chapter,
          user: user,
        })
        let newQuestion = await question.save()
        res.send({
          code: 0,
          msg: 'success',
          message: 'Successfully created question',
          data: newQuestion,
        })
      } else {
        res.status(404)
        throw new Error('Chapter not found')
      }
    } else {
      res.status(404)
      throw new Error('User not found')
    }
  } else {
    res.status(404)
    throw new Error('Failure to create question')
  }
})

export {
  getQuestions,getQuestionById, createQuestions
};

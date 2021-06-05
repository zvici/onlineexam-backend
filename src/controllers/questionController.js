import asyncHandler from 'express-async-handler'
import Question from '../models/question.model.js'
import User from '../models/user.model.js'
import Chapter from '../models/chapter.model.js'

// @desc   Fetch all questions
// @route  GET /api/questions
// @access Public
const getQuestions = asyncHandler(async (req, res) => {
  const questions = await Question.find({})
  res.send({
    code: 0,
    msg: 'success',
    message: 'List all questions',
    data: questions,
  })
})

// @desc   Fetch one Question
// @route  GET /api/questions/:id
// @access Public
const getQuestionById = asyncHandler(async (req, res) => {
  const question = await Question.findById(req.params.id)
  if (question) {
    res.send({
      code: 0,
      msg: 'success',
      message: `Info Question`,
      data: question,
    })
  } else {
    res.status(404)
    throw new Error('Chapter not found')
  }
})

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

// @desc   Fetch all questions by chapter
// @route  GET /api/questions/chapter/:id
// @access Public
const getQuestionsByChapter = asyncHandler(async (req, res) => {
  const pageSize = 8
  const page = Number(req.query.pageNumber) ? Number(req.query.pageNumber) : 1
  const lvl = Number(req.query.level) === 0 ? {} : { level: Number(req.query.level) }
  // const lvl = { level: req.query.level };

  const key = req.query.keyword
    ? {
        title: {
          $regex: req.query.keyword,
          $options: 'i',
        },
      }
    : {}
  const count = await Question.countDocuments({
    chapter: req.params.id,
    ...lvl,
    ...key,
  })
  const questions = await Question.find({
    chapter: req.params.id,
    ...lvl,
    ...key,
  })
    .populate({
      path: 'user',
    })
    .limit(pageSize)
    .skip(pageSize * (page - 1))
  if (questions) {
    res.send({
      code: 0,
      msg: 'success',
      data: { questions, page, pages: Math.ceil(count / pageSize) },
    })
  } else {
    res.status(404)
    throw new Error('Question not found')
  }
})

// @desc   Update questions by id
// @route  PUT /api/questions/
// @access Public

const updateQuestionsById = asyncHandler(async (req, res) => {
  const { id } = req.body
  if (id) {
    let checkQuestion = await Question.findById(id)
    if (checkQuestion) {
      Question.updateOne({ _id: id }, { $set: req.body })
        .exec()
        .then(() => {
          res.status(200).json({
            code: 0,
            msg: 'success',
            data: req.body,
          })
        })
        .catch((err) => {
          res.status(500).json({
            code: 1,
            msg: 'Server error. Please try again.',
          })
        })
    } else {
      res.status(404)
      throw new Error('Question not found')
    }
  } else {
    res.status(404)
    throw new Error('Id not found')
  }
})
// @desc   Delete questions by id
// @route  DELETE /api/questions/
// @access Public
const deleteQuestionsById = asyncHandler(async (req, res) => {
  const delQuestion = await Question.findById(req.params.id)
  if (delQuestion) {
    await delQuestion.remove()
    res.send({
      code: 0,
      msg: 'success',
      message: 'Question Removed',
    })
  } else {
    res.status(404)
    throw new Error('Question not found')
  }
})

export {
  getQuestions,
  getQuestionById,
  createQuestions,
  getQuestionsByChapter,
  updateQuestionsById,
  deleteQuestionsById,
}

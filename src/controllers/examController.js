import asyncHandler from 'express-async-handler'
import Exam from '../models/exam.model.js'
import User from '../models/user.model.js'
import Question from '../models/question.model.js'

// @desc   Fetch all exams
// @route  GET /api/exams
// @access Public
const getExams = asyncHandler(async (req, res) => {
  const pageSize = 8
  const page = Number(req.query.pageNumber) ? Number(req.query.pageNumber) : 1
  const keyword = req.query.keyword
    ? {
        name: {
          $regex: req.query.keyword,
          $options: 'i',
        },
      }
    : {}
  const count = await Exam.countDocuments({ ...keyword })

  const exams = await Exam.find({ ...keyword })
    .populate({
      path: 'user',
    })
    .populate({
      path: 'questions',
    })
    .limit(pageSize)
    .skip(pageSize * (page - 1))
    .sort({createdAt: -1})

  res.send({
    code: 0,
    msg: 'success',
    message: 'List all exams',
    data: { exams, page, pages: Math.ceil(count / pageSize) },
  })
})

// @desc   Fetch one exam
// @route  GET /api/exams/:id
// @access Public
const getExamById = asyncHandler(async (req, res) => {
  const exam = await Exam.findById(req.params.id).populate({
    path: 'questions',
  })
  if (exam) {
    res.send({
      code: 0,
      msg: 'success',
      message: `Info exam`,
      data: exam,
    })
  } else {
    res.status(404)
    throw new Error('Exam not found')
  }
})

// @desc   Create one exam
// @route  Post /api/exams/
// @access Public
const createExams = asyncHandler(async (req, res) => {
  const { name, questions, status, user } = req.body
  if (name && questions && status && user) {
    let checkUser = await User.findById(user)
    if (checkUser) {
      let exam = new Exam({
        name: name,
        questions: questions,
        status: status,
        user: user,
      })
      let newExam = await exam.save()
      res.send({
        code: 0,
        msg: 'success',
        message: 'Successfully created exam',
        data: newExam,
      })
    } else {
      res.status(404)
      throw new Error('User not found')
    }
  } else {
    res.status(404)
    throw new Error('Failure to create exam')
  }
})

// @desc   Update exams by id
// @route  PUT /api/exams/
// @access Public

const updateExamsById = asyncHandler(async (req, res) => {
  const { id } = req.body
  if (id) {
    let checkExam = await Exam.findById(id)
    if (checkExam) {
      Exam.updateOne({ _id: id }, { $set: req.body })
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
      throw new Error('Exam not found')
    }
  } else {
    res.status(404)
    throw new Error('Id not found')
  }
})
// @desc   Delete exams by id
// @route  DELETE /api/exams/
// @access Public
const deleteExamsById = asyncHandler(async (req, res) => {
  const delExam = await Exam.findById(req.params.id)
  if (delExam) {
    await delExam.remove()
    res.send({
      code: 0,
      msg: 'success',
      message: 'Exam Removed',
    })
  } else {
    res.status(404)
    throw new Error('Exam not found')
  }
})

export { getExams, getExamById, createExams, updateExamsById, deleteExamsById }

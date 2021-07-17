import asyncHandler from 'express-async-handler'
import Result from '../models/result.model.js'
import Schedule from '../models/schedule.model.js'

// @desc   add one result
// @route  POST /api/result
// @access Public
const addResult = asyncHandler(async (req, res) => {
  const { userID, answers, scheduleId } = req.body
  if (userID && answers && scheduleId) {
    const checkDuplicate = await Result.find({
      user: userID,
      schedule: scheduleId,
    })
    if (checkDuplicate && checkDuplicate.length >= 1) {
      res.status(404)
      throw new Error('Already exist')
    } else {
      const schedule = await Schedule.findById(scheduleId).populate({
        path: 'exam',
        populate: {
          path: 'questions',
          model: 'Question',
        },
      })
      if (schedule) {
        const checkUserID = await Schedule.find({
          _id: scheduleId,
          attendants: { $all: [`${userID}`] },
        })
        if (checkUserID && checkUserID.length >= 1) {
          const unit = 10 / schedule.exam.questions.length
          let score = 0
          await schedule.exam.questions.forEach((element) => {
            answers.forEach((item) => {
              if (item.id === element.id && item.answer === element.result) {
                score += 1
              }
            })
          })
          let newResullt = new Result({
            done: answers.map((item) => ({
              question: item.id,
              choice: item.answer === null ? -1 : item.answer,
            })),
            score: score * unit,
            schedule: scheduleId,
            user: userID,
          })
          let saveResult = await newResullt.save()
          res.send({
            code: 0,
            msg: 'success',
            message: 'Successfully created result',
            data: saveResult,
          })
        } else {
          res.status(404)
          throw new Error('User not found in Schedule')
        }
      } else {
        res.status(404)
        throw new Error('Schedule not found')
      }
    }
  } else {
    res.status(404)
    throw new Error('Failure to')
  }
})

// @desc   get one result
// @route  GET /api/result/user/:id
// @access Public

const getResultByUser = asyncHandler(async (req, res) => {
  const result = await Result.find({
    user: req.params.id,
  }).populate({
    path: 'schedule',
  })
  res.send({
    code: 0,
    msg: 'success',
    message: 'List all result',
    data: result,
  })
})

// @desc   Fetch all results
// @route  GET /api/results/schedule/:id
// @access Public
const getResults = asyncHandler(async (req, res) => {
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
  const count = await Result.countDocuments()

  const results = await Result.find({ schedule: req.params.id })
    .populate({
      path: 'user',
    })
    .populate({
      path: 'schedule',
    })
    .limit(pageSize)
    .skip(pageSize * (page - 1))
  res.send({
    code: 0,
    msg: 'success',
    message: 'List all results',
    data: { results, page, pages: Math.ceil(count / pageSize) },
  })
})

// @desc   Fetch all results
// @route  GET /api/results/schedule/all/:id
// @access Public
const getAllResults = asyncHandler(async (req, res) => {
  const results = await Result.find({ schedule: req.params.id })
    .populate({
      path: 'user',
    })
    .populate({
      path: 'schedule',
    })
  res.send({
    code: 0,
    msg: 'success',
    message: 'List all results',
    data: results,
  })
})

export { addResult, getResultByUser, getResults, getAllResults }

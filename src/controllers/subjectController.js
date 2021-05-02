import asyncHandler from 'express-async-handler'
import Subject from '../models/subject.model.js'

// @desc   Fetch all subject
// @route  GET /api/subjects
// @access Public
const getSubjects = asyncHandler(async (req, res) => {
  const pageSize = 8
  const page = Number(req.query.pageNumber) || 1
  const keyword = req.query.keyword
    ? {
        name: {
          $regex: req.query.keyword,
          $options: 'i',
        },
      }
    : {}
  const count = await Subject.countDocuments({ ...keyword })
  const subjects = await Subject.find({ ...keyword })
    .populate({
      path: 'user',
    })
    .sort({
      createdAt: -1,
    })
    .limit(pageSize)
    .skip(pageSize * (page - 1))
  res.send({
    code: 0,
    msg: 'success',
    message: 'List all subject',
    data: { subjects, page, pages: Math.ceil(count / pageSize) },
  })
})

// @desc   Fetch one subject
// @route  GET /api/subjects/:id
// @access Public
const getSubjectById = asyncHandler(async (req, res) => {
  const subject = await Subject.findById(req.params.id)
  if (subject) {
    res.send({
      code: 0,
      msg: 'success',
      message: `Info Subject: ${subject.name}`,
      data: subject,
    })
  } else {
    res.status(404)
    throw new Error('Subject not found')
  }
})
// @desc   Create one subject
// @route  Post /api/subjects/
// @access Public
const createSubject = asyncHandler(async (req, res) => {
  const { name, user } = req.body
  if (name && user) {
    let subject = new Subject({
      name: req.body.name,
      user: req.body.user,
    })
    let newSubject = await subject.save()
    res.send({
      code: 0,
      msg: 'success',
      message: 'Successfully created subject',
      data: newSubject,
    })
  } else {
    res.status(404)
    throw new Error('Failure to create subject')
  }
})
// @desc   Update one subject
// @route  Put /api/subjects/
// @access Public
const updateSubject = asyncHandler(async (req, res) => {
  const { _id, name, user } = req.body
  if (_id && name && user) {
    let subject = await Subject.findById(req.params.id)
    if (subject) {
      subject.name = name
      subject.user = user
      let updateSubject = await subject.save()
      res.send({
        code: 0,
        msg: 'success',
        message: 'Successfully update subject',
        data: updateSubject,
      })
    } else {
      res.status(404)
      throw new Error('Subject not found')
    }
  } else {
    res.status(404)
    throw new Error('Failure to update subject')
  }
})
// @desc   Delete one subject
// @route  Del /api/subjects/
// @access Public
const deleteSubject = asyncHandler(async (req, res) => {
  const subject = await Subject.findById(req.params.id)
  if (subject) {
    await subject.remove()
    res.send({
      code: 0,
      msg: 'success',
      message: 'Subject Removed',
      data: null,
    })
  } else {
    res.status(404)
    throw new Error('Subject not found')
  }
})
export {
  getSubjects,
  getSubjectById,
  createSubject,
  updateSubject,
  deleteSubject,
}

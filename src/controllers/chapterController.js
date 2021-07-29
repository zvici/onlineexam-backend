import asyncHandler from 'express-async-handler'
import Chapter from '../models/chapter.model.js'
import Subject from '../models/subject.model.js'
import User from '../models/user.model.js'

// @desc   Fetch all chapter
// @route  GET /api/chapters
// @access Public
const getChapters = asyncHandler(async (req, res) => {
  const chapters = await Chapter.find({})
  res.send({
    code: 0,
    msg: 'success',
    message: 'List all chapter',
    data: chapters,
  })
})
// @desc   Fetch one Chapters
// @route  GET /api/chapters/:id
// @access Public
const getChaptersById = asyncHandler(async (req, res) => {
  const chapter = await Chapter.findById(req.params.id)
  if (chapter) {
    res.send({
      code: 0,
      msg: 'success',
      message: `Info Chapter: ${chapter.name}`,
      data: chapter,
    })
  } else {
    res.status(404)
    throw new Error('Chapter not found')
  }
})

// @desc   Fetch one Chapters by subject
// @route  GET /api/chapters/subject/:id
// @access Public
const getChaptersBySubject = asyncHandler(async (req, res) => {
  const pageSize = 8
  const page = Number(req.params.pageNumber) ? Number(req.params.pageNumber) : 1
  const key = req.query.keyword
    ? {
        name: {
          $regex: req.query.keyword,
          $options: 'i',
        },
      }
    : {}
  const count = await Chapter.countDocuments({ subject: req.params.id, ...key })
  const chapters = await Chapter.find({ subject: req.params.id, ...key })
    .populate({
      path: 'user',
    })
    .limit(pageSize)
    .skip(pageSize * (page - 1))

  if (chapters) {
    res.send({
      code: 0,
      msg: 'success',
      data: { chapters, page, pages: Math.ceil(count / pageSize) },
    })
  } else {
    res.status(404)
    throw new Error('Chapter not found')
  }
})

// @desc   Fetch one Chapters by subject
// @route  GET /api/chapters/subject/all/:id
// @access Public
const getAllChaptersBySubject = asyncHandler(async (req, res) => {
  const chapters = await Chapter.find({ subject: req.params.id }).populate({
    path: 'subject',
  })
  if (chapters) {
    res.send({
      code: 0,
      msg: 'success',
      data: chapters,
    })
  } else {
    res.status(404)
    throw new Error('Chapter not found')
  }
})

// @desc   Create one chapters
// @route  Post /api/chapters/
// @access Public
const createChapters = asyncHandler(async (req, res) => {
  const { name, subject, user } = req.body
  if (name && subject && user) {
    let checkUser = await User.findById(user)
    if (checkUser) {
      let checkSubject = await Subject.findById(subject)
      if (checkSubject) {
        let chapter = new Chapter({
          name: name,
          subject: subject,
          user: user,
        })
        let newChapter = await chapter.save()
        res.send({
          code: 0,
          msg: 'success',
          message: 'Successfully created chapter',
          data: newChapter,
        })
      } else {
        res.status(404)
        throw new Error('Subject not found')
      }
    } else {
      res.status(404)
      throw new Error('User not found')
    }
  } else {
    res.status(404)
    throw new Error('Failure to create chapter')
  }
})
// @desc   Update one chapter
// @route  Put /api/chapters/
// @access Public
const updateChapter = asyncHandler(async (req, res) => {
  const { _id, name, subject, user } = req.body
  if (_id && name && subject && user) {
    let chapter = await Chapter.findById(_id)
    if (chapter) {
      chapter.name = name
      chapter.subject = subject
      chapter.user = user
      let updateChapter = await chapter.save()
      res.send({
        code: 0,
        msg: 'success',
        message: 'Successfully update Chapter',
        data: updateChapter,
      })
    } else {
      res.status(404)
      throw new Error('Chapter not found')
    }
  } else {
    res.status(404)
    throw new Error('Failure to update chapter')
  }
})
// @desc   Delete one chapter
// @route  Del /api/chapters/
// @access Public
const deleteChapter = asyncHandler(async (req, res) => {
  const chapter = await Chapter.findById(req.params.id)
  if (chapter) {
    await chapter.remove()
    res.send({
      code: 0,
      msg: 'success',
      message: 'Chapter removed',
      data: null,
    })
  } else {
    res.status(404)
    throw new Error('Chapter not found')
  }
})
export {
  getChapters,
  getChaptersById,
  createChapters,
  updateChapter,
  deleteChapter,
  getChaptersBySubject,
  getAllChaptersBySubject,
}

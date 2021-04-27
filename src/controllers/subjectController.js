import asyncHandler from "express-async-handler";
import Subject from "../models/subject.model.js";

// @desc   Fetch all subject
// @route  GET /api/subjects
// @access Public
const getSubjects = asyncHandler(async (req, res) => {
  const subjects = await Subject.find({});
  res.send({
    code: 0,
    msg: "success",
    message: "List all subject",
    data: subjects,
  });
});

// @desc   Fetch one subject
// @route  GET /api/subjects/:id
// @access Public
const getSubjectById = asyncHandler(async (req, res) => {
  const subject = await Subject.findById(req.params.id);
  if (subject) {
    res.send({
      code: 0,
      msg: "success",
      message: `Info Subject: ${subject.name}`,
      data: subject,
    });
  } else {
    res.status(404);
    throw new Error("Subject not found");
  }
});
// @desc   Create one subject
// @route  Post /api/subjects/
// @access Public
const createSubject = asyncHandler(async (req, res) => {
  const { name, idUser } = req.body;
  if (name && idUser) {
    let subject = new Subject({
      name: req.body.name,
      user: req.body.idUser,
    });
    let newSubject = await subject.save();
    res.send({
      code: 0,
      msg: "success",
      message: 'Successfully created subject',
      data: newSubject,
    });
  } else {
    res.status(404);
    throw new Error("Failure to create subject");
  }
});
// @desc   Update one subject
// @route  Put /api/subjects/
// @access Public
export { getSubjects, getSubjectById, createSubject };

import asyncHandler from "express-async-handler";
import Subject from "../models/subject.model.js";

// @desc   Fetch all subject
// @route  GET /api/subject
// @access Public
const getSubjects = asyncHandler(async (req, res) => {
  const subjects = await Subject.find({});
  res.json(subjects);
});

// @desc   Fetch one subject
// @route  GET /api/subject/:id
// @access Public
const getSubjectById = asyncHandler(async (req, res) => {
    const subject = await Subject.findById(req.param.id);
    if(subject){
        res.json(subject)
    }
    else{
        res.status(404)
        throw new Error('Subject not found')
        
    }
});

export { getSubjects, getSubjectById };

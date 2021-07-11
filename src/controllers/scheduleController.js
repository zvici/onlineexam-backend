import asyncHandler from "express-async-handler";
import Schedule from "../models/schedule.model.js";
import User from "../models/user.model.js";
import Question from "../models/question.model.js";

// @desc   Fetch all schedules
// @route  GET /api/schedules
// @access Public
const getSchedules = asyncHandler(async (req, res) => {
  const pageSize = 8;
  const page = Number(req.query.pageNumber) ? Number(req.query.pageNumber) : 1;
  const keyword = req.query.keyword
    ? {
        name: {
          $regex: req.query.keyword,
          $options: "i",
        },
      }
    : {};
  const count = await Schedule.countDocuments({ ...keyword });

  const schedules = await Schedule.find({ ...keyword })
    .populate({
      path: "user",
    })
    .populate({
      path: "exam",
    })
    .limit(pageSize)
    .skip(pageSize * (page - 1));
  res.send({
    code: 0,
    msg: "success",
    message: "List all schedules",
    data: { schedules, page, pages: Math.ceil(count / pageSize) },
  });
});

// @desc   Fetch one exam
// @route  GET /api/schedules/:id
// @access Public
const getScheduleById = asyncHandler(async (req, res) => {
  const schedule = await Schedule.findById(req.params.id)
    .populate({
      path: "user",
    })
    .populate({
      path: "exam",
      populate: {
        path: "questions",
        model: "Question",
      },
    })
    .populate({
      path: "attendants",
    });
  if (schedule) {
    res.send({
      code: 0,
      msg: "success",
      message: `Info schedule`,
      data: schedule,
    });
  } else {
    res.status(404);
    throw new Error("Schedule not found");
  }
});

// @desc   Fetch schedules by id attendants
// @route  GET /api/schedules/attendants/:id
// @access Public

const getSchedulesByAttendants = asyncHandler(async (req, res) => {
  const result = await Schedule.find({
    attendants: { $all: [`${req.params.id}`] },
  }).sort({ timeStart: -1 });
  res.send(result);
});

// @desc   Create one schedule
// @route  Post /api/schedules/
// @access Public
const createSchedules = asyncHandler(async (req, res) => {
  const { name, timeStart, timeEnd, time, status, exam, attendants, user } =
    req.body;
  if (
    name &&
    timeStart &&
    timeEnd &&
    time &&
    status &&
    exam &&
    attendants &&
    user
  ) {
    let checkUser = await User.findById(user);
    if (checkUser) {
      let schedule = new Schedule({
        name: name,
        timeStart: timeStart,
        timeEnd: timeEnd,
        time: time,
        status: status,
        exam: exam,
        attendants: attendants,
        user: user,
      });
      let newSchedule = await schedule.save();
      res.send({
        code: 0,
        msg: "success",
        message: "Successfully created schedule",
        data: newSchedule,
      });
    } else {
      res.status(404);
      throw new Error("User not found");
    }
  } else {
    res.status(404);
    throw new Error("Failure to create schedule");
  }
});

// @desc   Update schedules by id
// @route  PUT /api/schedules/
// @access Public

const updateSchedulesById = asyncHandler(async (req, res) => {
  const { id } = req.body;
  if (id) {
    let checkSchedule = await Schedule.findById(id);
    if (checkSchedule) {
      Schedule.updateOne({ _id: id }, { $set: req.body })
        .exec()
        .then(() => {
          res.status(200).json({
            code: 0,
            msg: "success",
            data: req.body,
          });
        })
        .catch((err) => {
          res.status(500).json({
            code: 1,
            msg: "Server error. Please try again.",
          });
        });
    } else {
      res.status(404);
      throw new Error("Schedule not found");
    }
  } else {
    res.status(404);
    throw new Error("Id not found");
  }
});
// @desc   Delete schedules by id
// @route  DELETE /api/schedules/
// @access Public
const deleteSchedulesById = asyncHandler(async (req, res) => {
  const delSchedule = await Schedule.findById(req.params.id);
  if (delSchedule) {
    await delSchedule.remove();
    res.send({
      code: 0,
      msg: "success",
      message: "Schedule Removed",
    });
  } else {
    res.status(404);
    throw new Error("Schedule not found");
  }
});

export {
  getSchedules,
  getScheduleById,
  createSchedules,
  updateSchedulesById,
  deleteSchedulesById,
  getSchedulesByAttendants,
};

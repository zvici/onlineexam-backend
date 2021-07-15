import asyncHandler from "express-async-handler";
import Result from "../models/result.model.js";
import Schedule from "../models/schedule.model.js";

// @desc   add one schedules
// @route  POST /api/result
// @access Public
const addResult = asyncHandler(async (req, res) => {
  const { userID, answers, scheduleId } = req.body;
  if (userID && answers && scheduleId) {
    const checkDuplicate = await Result.find({
      user: userID,
      schedule: scheduleId,
    });
    if (checkDuplicate && checkDuplicate.length >= 1) {
      res.status(404);
      throw new Error("Already exist");
    } else {
      const schedule = await Schedule.findById(scheduleId).populate({
        path: "exam",
        populate: {
          path: "questions",
          model: "Question",
        },
      });
      if (schedule) {
        const checkUserID = await Schedule.find({
          _id: scheduleId,
          attendants: { $all: [`${userID}`] },
        });
        if (checkUserID && checkUserID.length >= 1) {
          const unit = 10 / schedule.exam.questions.length;
          let score = 0;
          await schedule.exam.questions.forEach((element) => {
            answers.forEach((item) => {
              if (item.id === element.id && item.answer === element.result) {
                score += 1;
              }
            });
          });
          let newResullt = new Result({
            done: answers.map((item) => ({
              question: item.id,
              choice: item.answer,
            })),
            score: score * unit,
            schedule: scheduleId,
            user: userID,
          });
          let saveResult = await newResullt.save();
          res.send({
            code: 0,
            msg: "success",
            message: "Successfully created result",
            data: saveResult,
          });
        } else {
          res.status(404);
          throw new Error("User not found in Schedule");
        }
      } else {
        res.status(404);
        throw new Error("Schedule not found");
      }
    }
  } else {
    res.status(404);
    throw new Error("Failure to");
  }
});

export { addResult };

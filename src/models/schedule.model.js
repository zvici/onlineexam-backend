import mongoose from 'mongoose'

const scheduleSchema = mongoose.Schema(
  {
    timeStart: {
      type: String,
      required: true,
    },
    timeEnd: {
      type: String,
      required: true,
    },
    time: {
      type: Number,
      required: true,
      default: 45,
    },
    status: {
      type: Number,
      required: true,
      default: 1,
    },
    exam: {
      type: mongoose.Schema.Types.ObjectId,
      required: true,
      ref: 'Exam',
    },
    user: {
      type: mongoose.Schema.Types.ObjectId,
      required: true,
      ref: 'User',
    },
  },
  {
    timestamps: true,
  }
)

const Schedule = mongoose.model('Schedule', scheduleSchema)

export default Schedule

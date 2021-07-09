import mongoose from 'mongoose'

const scheduleSchema = mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
    },
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
    attendants: {
      type: [mongoose.Schema.Types.ObjectId],
      ref: 'User',
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

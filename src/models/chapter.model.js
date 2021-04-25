import mongoose from 'mongoose'

const chapterSchema = mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
    },
    subject: {
      type: mongoose.Schema.Types.ObjectId,
      required: true,
      ref: 'Subject',
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

const Chapter = mongoose.model('Chapter', chapterSchema)

export default Chapter

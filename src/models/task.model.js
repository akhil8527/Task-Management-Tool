import mongoose, { Schema } from "mongoose"
import { TaskStatus, AvailableTaskStatus } from "../utils/constants"

const TaskSchema = new Schema(
  {
    title: {
      type: String,
      trim: true,
      required: true,
    },
    description: {
      type: String,
      trim: true,
      minLength: 10,
      maxLength: 300,
    },
    project: {
      type: Schema.Types.ObjectId,
      ref: "Project",
      required: true,
    },
    assignedBy: {
      type: Schema.Types.ObjectId,
      ref: "Project",
      required: true,
    },
    assignedTo: {
      type: Schema.Types.ObjectId,
      ref: "Project",
      required: true,
    },
    status: {
      type: String,
      enum: AvailableTaskStatus,
      default: TaskStatus.NOT_STARTED,
    },
    attachments: {
      type: [
        {
          name: String,
          url: String,
          mimetype: String,
          size: Number,
        },
      ],
      default: [],
    },
  },
  { timestamps: true },
)

export const Task = mongoose.model("Task", TaskSchema)

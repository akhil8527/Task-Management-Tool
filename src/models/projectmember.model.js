import mongoose, { Schema } from "mongoose"
import { UserRoles, AvailableUserRoles } from "../utils/constants"

const ProjectMemberSchema = new Schema(
  {
    user: {
      type: Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    project: {
      type: Schema.Types.ObjectId,
      ref: "Project",
      required: true,
    },
    role: {
      type: String,
      enum: AvailableUserRoles,
      default: UserRoles.MEMBER,
    },
  },
  { timestamps: true },
)

export const ProjectMember = mongoose.model(
  "ProjectMember",
  ProjectMemberSchema,
)

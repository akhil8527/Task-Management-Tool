export const UserRoles = {
  ADMIN: "admin",
  PROJECT_ADMIN: "project_admin",
  MEMBER: "member",
}

export const AvailableUserRoles = Object.values(UserRoles)

export const TaskStatus = {
  NOT_STARTED: "not_started",
  IN_PROGRESS: "in_progress",
  REVIEW: "review",
  DONE: "done",
}

export const AvailableTaskStatus = Object.values(TaskStatus)

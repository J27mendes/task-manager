export const getStatusClasses = (task) => {
  if (task.status === "done") {
    return "bg-brend-primary text-brend-primary"
  }

  if (task.status === "in_progress") {
    return "bg-brend-progress text-brend-progress"
  }

  if (task.status === "not_started") {
    return "bg-brend-notStarted text-brend-notStarted"
  }
}

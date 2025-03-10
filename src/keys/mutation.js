export const taskMutationKeys = {
  add: () => ["addTask"],
  clear: () => ["clearTasks"],
  delete: (taskId) => ["deleteTask", taskId],
  update: () => ["updateTaskStatus"],
  updateId: (taskId) => ["updateTask", taskId],
}

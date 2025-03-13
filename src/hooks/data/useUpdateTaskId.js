import { useMutation, useQueryClient } from "@tanstack/react-query"

import { taskMutationKeys, taskQueriesKeys } from "../../keys"
import { api } from "../../libs"

export const useUpdateTaskId = (taskId) => {
  const queryClient = useQueryClient()
  return useMutation({
    mutationKey: taskMutationKeys.updateId(taskId),
    mutationFn: async (newTask) => {
      const fullTask = {
        title: newTask.title.trim(),
        time: newTask.time,
        description: newTask.description.trim(),
      }
      const { data: updateTask } = await api.patch(
        `/TaskManager/${taskId}`,
        fullTask
      )

      const updatedTask = updateTask
      return updatedTask
    },
    onSuccess: (updatedTask) => {
      queryClient.setQueryData(taskQueriesKeys.getId(taskId), updatedTask)
      queryClient.invalidateQueries(taskQueriesKeys.getId(taskId))
    },
  })
}

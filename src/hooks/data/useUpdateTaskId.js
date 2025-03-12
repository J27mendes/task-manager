import { useMutation, useQueryClient } from "@tanstack/react-query"

import { taskMutationKeys, taskQueriesKeys } from "../../keys"
import { api } from "../../libs"

export const useUpdateTaskId = (taskId) => {
  const queryClient = useQueryClient()
  return useMutation({
    mutationKey: taskMutationKeys.updateId(taskId),
    mutationFn: async (newTask) => {
      const { data: updateTask } = await api.patch(`${taskId}`, {
        title: newTask.title.trim(),
        time: newTask.time,
        description: newTask.description.trim(),
      })

      const updatedTask = updateTask

      queryClient.setQueryData(taskQueriesKeys.getId(taskId), (oldTask) => {
        if (!oldTask) {
          return updatedTask
        }

        return { ...oldTask, ...updatedTask }
      })
    },
  })
}

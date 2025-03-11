import { useMutation } from "@tanstack/react-query"

import { taskMutationKeys } from "../../keys"
import { api } from "../../libs"

export const useDeleteTasks = (taskId) => {
  return useMutation({
    mutationKey: taskMutationKeys.delete(taskId),
    mutationFn: async () => {
      const { data: deleteTask } = await api.delete(`${taskId}`)

      return deleteTask
    },
  })
}

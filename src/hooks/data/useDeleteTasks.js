import { useMutation } from "@tanstack/react-query"

import { taskMutationKeys } from "../../keys/mutation"
import { api } from "../../libs/api"

export const useDeleteTasks = (taskId) => {
  return useMutation({
    mutationKey: taskMutationKeys.delete(taskId),
    mutationFn: async () => {
      const { data: deleteTask } = await api.delete(`${taskId}`)

      return deleteTask
    },
  })
}

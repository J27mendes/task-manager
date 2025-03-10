import { useMutation, useQueryClient } from "@tanstack/react-query"

import { taskMutationKeys } from "../../keys/mutation"
import { taskQueriesKeys } from "../../keys/queries"
import { api } from "../../libs/api"

export const useAddTask = () => {
  const queryClient = useQueryClient()
  return useMutation({
    mutationKey: taskMutationKeys.add(),
    mutationFn: async (task) => {
      const { data: createdTask } = await api.post(" ", task)
      return createdTask
    },
    onSuccess: (createdTask) => {
      queryClient.setQueryData(taskQueriesKeys.get(), (currentTasks = []) => {
        return [...currentTasks, createdTask]
      })
    },
  })
}

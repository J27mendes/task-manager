import { useMutation, useQueryClient } from "@tanstack/react-query"

import { taskMutationKeys, taskQueriesKeys } from "../../keys"
import { api } from "../../libs"
import { errorToast } from "../../utils"

export const useUpdateTask = () => {
  const queryClient = useQueryClient()
  return useMutation({
    mutationKey: taskMutationKeys.update(),
    mutationFn: async ({ taskId, newStatus }) => {
      const { data: updateTask } = await api.patch(`/TaskManager/${taskId}`, {
        status: newStatus,
      })

      return updateTask
    },
    onSuccess: (_, { taskId, newStatus }) => {
      queryClient.setQueryData(taskQueriesKeys.get(), (currentTasks = []) =>
        currentTasks.map((task) =>
          task.id === taskId ? { ...task, status: newStatus } : task
        )
      )
    },
    onError: () => {
      errorToast("Erro ao atualizar a tarefa, tente novamente!")
    },
  })
}

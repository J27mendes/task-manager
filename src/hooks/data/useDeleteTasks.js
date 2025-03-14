import { useMutation, useQueryClient } from "@tanstack/react-query"

import { taskMutationKeys, taskQueriesKeys } from "../../keys"
import { api } from "../../libs"
import { errorToast, successToast } from "../../utils"

export const useDeleteTasks = (taskId) => {
  const queryClient = useQueryClient()

  return useMutation({
    mutationKey: taskMutationKeys.delete(taskId),
    mutationFn: async () => {
      await api.delete(`/TaskManager/${taskId}`)
      return taskId
    },
    onSuccess: (deletedTaskId) => {
      queryClient.setQueryData(taskQueriesKeys.get(), (currentTasks) => {
        if (!Array.isArray(currentTasks)) return []
        return currentTasks.filter((task) => task.id !== deletedTaskId)
      })

      queryClient.invalidateQueries(taskQueriesKeys.get())

      successToast("Tarefa deletada com sucesso!")
    },
    onError: () => {
      errorToast("Erro ao deletar tarefa, por favor tente novamente!")
    },
  })
}

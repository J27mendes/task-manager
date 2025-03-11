import { useMutation, useQueryClient } from "@tanstack/react-query"

import { taskMutationKeys } from "../../keys"
import { api } from "../../libs"
import { errorToast, successToast } from "../../utils"

export const useDeleteTasks = (taskId) => {
  const queryClient = useQueryClient()
  return useMutation({
    mutationKey: taskMutationKeys.delete(taskId),
    mutationFn: async () => {
      const { data: deleteTask } = await api.delete(`${taskId}`)

      return deleteTask
    },
    onSuccess: (deletedTask) => {
      queryClient.setQueryData(["TaskManager"], (currentTasks = []) =>
        currentTasks.filter((task) => task.id !== deletedTask.id)
      )
      successToast("Tarefa deletada com sucesso!")
    },
    onError: () => {
      errorToast("Erro ao deletar tarefa, por favor tente novamente!")
    },
  })
}

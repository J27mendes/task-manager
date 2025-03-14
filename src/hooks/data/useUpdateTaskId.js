import { useMutation, useQueryClient } from "@tanstack/react-query"

import { taskMutationKeys, taskQueriesKeys } from "../../keys"
import { api } from "../../libs"
import { errorToast } from "../../utils"

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
    onSuccess: async (updatedTask) => {
      queryClient.setQueryData(taskQueriesKeys.getId(taskId), updatedTask)
      await queryClient.invalidateQueries(taskQueriesKeys.getId(taskId))
      await queryClient.refetchQueries(taskQueriesKeys.getId(taskId))
    },
    onError: (error) => {
      console.error("Erro ao atualizar a tarefa:", error)
      errorToast("Erro ao atualizar a tarefa. Tente novamente!")
    },
  })
}

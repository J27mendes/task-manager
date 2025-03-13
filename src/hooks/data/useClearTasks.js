import { useMutation, useQueryClient } from "@tanstack/react-query"

import { taskMutationKeys, taskQueriesKeys } from "../../keys"
import { api } from "../../libs"
import { errorToast, successToast } from "../../utils"

export const useClearTasks = () => {
  const queryClient = useQueryClient()
  return useMutation({
    mutationKey: taskMutationKeys.clear(),
    mutationFn: async () => {
      const { data: allTasks } = await api.get("/TaskManager")

      for (const tasks of allTasks) {
        await api.delete(`/TaskManager/${tasks.id}`)
      }
    },
    onSuccess: () => {
      queryClient.setQueryData(taskQueriesKeys.get(), [])
      successToast("Todas as tarefas foram removidas com sucesso!")
    },
    onError: () => errorToast("Erro ao limpar as tarefas"),
  })
}

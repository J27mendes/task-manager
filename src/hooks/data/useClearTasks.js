import { useMutation, useQueryClient } from "@tanstack/react-query"

import { taskMutationKeys } from "../../keys/mutation"
import { taskQueriesKeys } from "../../keys/queries"
import { api } from "../../libs/api"
import { errorToast, successToast } from "../../utils"

export const useClearTasks = () => {
  const queryClient = useQueryClient()
  return useMutation({
    mutationKey: taskMutationKeys.clear(),
    mutationFn: async () => {
      const { data: allTasks } = await api.get("")

      for (const tasks of allTasks) {
        await api.delete(`${tasks.id}`)
      }
    },
    onSuccess: () => {
      queryClient.setQueryData(taskQueriesKeys.get(), [])
      successToast("Todas as tarefas foram removidas com sucesso!")
    },
    onError: () => errorToast("Erro ao limpar as tarefas"),
  })
}

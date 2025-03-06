import { useMutation, useQueryClient } from '@tanstack/react-query'

import { api } from '../../libs/api'
import { errorToast, successToast } from '../../utils'

export const useClearTasks = () => {
  const queryClient = useQueryClient()
  return useMutation({
    mutationKey: ['clearTasks'],
    mutationFn: async () => {
      const { data: allTasks } = await api.get('')

      for (const tasks of allTasks) {
        await api.delete(`${tasks.id}`)
      }
    },
    onSuccess: () => {
      queryClient.setQueryData(['TaskManager'], [])
      successToast('Todas as tarefas foram removidas com sucesso!')
    },
    onError: () => errorToast('Erro ao limpar as tarefas'),
  })
}

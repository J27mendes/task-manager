import { useMutation, useQueryClient } from '@tanstack/react-query'

import { errorToast, successToast } from '../../utils'

export const useClearTasks = () => {
  const queryClient = useQueryClient()
  return useMutation({
    mutationKey: ['clearTasks'],
    mutationFn: async () => {
      const response = await fetch('http://localhost:3000/TaskManager')
      const allTasks = await response.json()

      for (const tasks of allTasks) {
        await fetch(`http://localhost:3000/TaskManager/${tasks.id}`, {
          method: 'DELETE',
        })
      }
    },
    onSuccess: () => {
      queryClient.setQueryData(['TaskManager'], [])
      successToast('Todas as tarefas foram removidas com sucesso!')
    },
    onError: () => errorToast('Erro ao limpar as tarefas'),
  })
}

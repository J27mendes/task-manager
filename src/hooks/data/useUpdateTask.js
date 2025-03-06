import { useMutation, useQueryClient } from '@tanstack/react-query'

import { api } from '../../libs/api'
import { errorToast } from '../../utils'

export const useUpdateTask = () => {
  const queryClient = useQueryClient()
  return useMutation({
    mutationKey: ['updateTaskStatus'],
    mutationFn: async ({ taskId, newStatus }) => {
      const { data: updateTask } = await api.patch(`${taskId}`, {
        status: newStatus,
      })

      return updateTask
    },
    onSuccess: (_, { taskId, newStatus }) => {
      queryClient.setQueryData(['TaskManager'], (currentTasks = []) =>
        currentTasks.map((task) =>
          task.id === taskId ? { ...task, status: newStatus } : task
        )
      )
    },
    onError: () => {
      errorToast('Erro ao atualizar a tarefa, tente novamente!')
    },
  })
}

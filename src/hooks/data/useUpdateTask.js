import { useMutation, useQueryClient } from '@tanstack/react-query'

import { errorToast } from '../../utils'

export const useUpdateTask = () => {
  const queryClient = useQueryClient()
  return useMutation({
    mutationKey: ['updateTaskStatus'],
    mutationFn: async ({ taskId, newStatus }) => {
      const response = await fetch(
        `http://localhost:3000/TaskManager/${taskId}`,
        {
          method: 'PATCH',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ status: newStatus }),
        }
      )

      if (!response.ok) {
        throw new Error('Erro ao atualizar a tarefa')
      }

      return response.json()
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

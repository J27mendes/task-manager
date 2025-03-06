import { useMutation } from '@tanstack/react-query'

import { api } from '../../libs/api'

export const useDeleteTasks = (taskId) => {
  return useMutation({
    mutationKey: ['deleteTask', taskId],
    mutationFn: async () => {
      const { data: deleteTask } = await api.delete(`${taskId}`)

      return deleteTask
    },
  })
}

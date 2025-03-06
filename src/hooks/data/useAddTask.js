import { useMutation, useQueryClient } from '@tanstack/react-query'

import { api } from '../../libs/api'

export const useAddTask = () => {
  const queryClient = useQueryClient()
  return useMutation({
    mutationKey: ['addTask'],
    mutationFn: async (task) => {
      const { data: createdTask } = await api.post(' ', task)
      return createdTask
    },
    onSuccess: (createdTask) => {
      queryClient.setQueryData(['TaskManager'], (currentTasks = []) => {
        return [...currentTasks, createdTask]
      })
    },
  })
}

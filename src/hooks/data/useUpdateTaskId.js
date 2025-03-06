import { useMutation, useQueryClient } from '@tanstack/react-query'

import { api } from '../../libs/api'

export const useUpdateTaskId = (taskId) => {
  const queryClient = useQueryClient()
  return useMutation({
    mutationKey: ['updateTask', taskId],
    mutationFn: async (newTask) => {
      const { data: updateTask } = await api.patch(`${taskId}`, {
        title: newTask.title.trim(),
        time: newTask.time,
        description: newTask.description.trim(),
      })

      const updatedTask = updateTask

      queryClient.setQueryData(['task', taskId], (oldTask) => {
        if (!oldTask) {
          return updatedTask
        }

        return { ...oldTask, ...updatedTask }
      })
    },
  })
}

import { useMutation, useQueryClient } from '@tanstack/react-query'

export const useDeleteTaskId = (taskId) => {
  const queryClient = useQueryClient()
  return useMutation({
    mutationKey: ['deleteTask', taskId],
    mutationFn: async () => {
      const response = await fetch(
        `http://localhost:3000/TaskManager/${taskId}`,
        {
          method: 'DELETE',
        }
      )
      const deletedTask = await response.json()
      queryClient.setQueryData(['task', taskId], (oldTask) => {
        if (!oldTask) {
          return deletedTask
        }

        return { ...oldTask, ...deletedTask }
      })
    },
  })
}

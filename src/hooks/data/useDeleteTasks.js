import { useMutation } from '@tanstack/react-query'

export const useDeleteTasks = (taskId) => {
  return useMutation({
    mutationKey: ['deleteTask', taskId],
    mutationFn: async () => {
      const response = await fetch(
        `http://localhost:3000/TaskManager/${taskId}`,
        {
          method: 'DELETE',
        }
      )
      return response.json()
    },
  })
}

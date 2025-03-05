import { useMutation, useQueryClient } from '@tanstack/react-query'

export const useUpdateTaskId = (taskId) => {
  const queryClient = useQueryClient()
  return useMutation({
    mutationKey: ['updateTask', taskId],
    mutationFn: async (data) => {
      const response = await fetch(
        `http://localhost:3000/TaskManager/${taskId}`,
        {
          method: 'PATCH',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            title: data.title.trim(),
            time: data.time,
            description: data.description.trim(),
          }),
        }
      )
      if (!response.ok) {
        throw new Error()
      }
      const updatedTask = await response.json()

      queryClient.setQueryData(['task', taskId], (oldTask) => {
        if (!oldTask) {
          return updatedTask
        }

        return { ...oldTask, ...updatedTask }
      })
    },
  })
}

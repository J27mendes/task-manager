import { useQuery } from '@tanstack/react-query'

export const useGetTasks = () => {
  return useQuery({
    queryKey: ['TaskManager'],
    queryFn: async () => {
      const response = await fetch('http://localhost:3000/TaskManager', {
        method: 'GET',
      })
      const tasks = await response.json()
      return tasks
    },
  })
}

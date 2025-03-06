import { useQuery } from '@tanstack/react-query'

import { api } from '../../libs/api'

export const useGetTasks = () => {
  return useQuery({
    queryKey: ['TaskManager'],
    queryFn: async () => {
      const { data: tasks } = await api.get('')

      return tasks
    },
  })
}

import { useQuery } from '@tanstack/react-query'

import { api } from '../../libs/api'

export const useGetTaskId = ({ taskId, reset }) => {
  return useQuery({
    queryKey: ['task', taskId],
    queryFn: async () => {
      const { data: getTaskId } = await api.get(`${taskId}`)
      reset(getTaskId)
      return getTaskId
    },
  })
}

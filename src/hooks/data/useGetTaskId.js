import { useQuery } from "@tanstack/react-query"

import { taskQueriesKeys } from "../../keys/queries"
import { api } from "../../libs/api"

export const useGetTaskId = ({ taskId, reset }) => {
  return useQuery({
    queryKey: taskQueriesKeys.getId(taskId),
    queryFn: async () => {
      const { data: getTaskId } = await api.get(`${taskId}`)
      reset(getTaskId)
      return getTaskId
    },
  })
}

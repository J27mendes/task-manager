import { useQuery } from "@tanstack/react-query"

import { taskQueriesKeys } from "../../keys"
import { api } from "../../libs"

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

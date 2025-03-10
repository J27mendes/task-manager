import { useQuery } from "@tanstack/react-query"

import { taskQueriesKeys } from "../../keys/queries"
import { api } from "../../libs/api"

export const useGetTasks = () => {
  return useQuery({
    queryKey: taskQueriesKeys.get(),
    queryFn: async () => {
      const { data: tasks } = await api.get("")

      return tasks
    },
  })
}

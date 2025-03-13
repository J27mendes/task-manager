import { useQuery } from "@tanstack/react-query"

import { taskQueriesKeys } from "../../keys"
import { api } from "../../libs"

export const useGetTasks = () => {
  return useQuery({
    queryKey: taskQueriesKeys.get(),
    queryFn: async () => {
      const { data } = await api.get("/TaskManager")

      const tasks = Array.isArray(data) ? data : data?.tasks || []

      return tasks
    },
  })
}

import { useQuery } from "@tanstack/react-query"

import { taskQueriesKeys } from "../../keys"
import { api } from "../../libs"

export const useGetTaskId = ({ taskId, reset }) => {
  return useQuery({
    queryKey: taskQueriesKeys.getId(taskId),
    queryFn: async () => {
      const { data: getTaskId } = await api.get(`${taskId}`)

      if (
        getTaskId &&
        typeof getTaskId === "object" &&
        !Array.isArray(getTaskId)
      ) {
        reset(getTaskId)
      } else {
        console.error("Dados inválidos recebidos para a tarefa:", getTaskId)

        reset({})
      }
      return getTaskId
    },
  })
}

// import { useQuery } from "@tanstack/react-query"

// import { taskQueriesKeys } from "../../keys"
// import { api } from "../../libs"

// export const useGetTaskId = ({ taskId, reset }) => {
//   return useQuery({
//     queryKey: taskQueriesKeys.getId(taskId),
//     queryFn: async () => {
//       const { data: getTaskId } = await api.get(`/TaskManager/${taskId}`)

//       if (
//         getTaskId &&
//         typeof getTaskId === "object" &&
//         !Array.isArray(getTaskId)
//       ) {
//         reset(getTaskId)
//       } else {
//         console.error("Dados inválidos recebidos para a tarefa:", getTaskId)

//         reset({})
//       }
//       return getTaskId
//     },
//   })
// }

import { useQuery } from "@tanstack/react-query"

import { taskQueriesKeys } from "../../keys"
import { api } from "../../libs"

export const useGetTaskId = ({ taskId }) => {
  return useQuery({
    queryKey: taskQueriesKeys.getId(taskId),
    queryFn: async () => {
      const { data: getTaskId } = await api.get(`/TaskManager/${taskId}`)

      if (
        !getTaskId ||
        typeof getTaskId !== "object" ||
        Array.isArray(getTaskId)
      ) {
        console.error("Dados inválidos recebidos para a tarefa:", getTaskId)
        return null
      }

      return getTaskId
    },
    enabled: !!taskId,
  })
}

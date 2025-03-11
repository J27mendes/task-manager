import { useQuery } from "@tanstack/react-query"

import { taskQueriesKeys } from "../../keys"
import { hasUserConsented } from "../../services"

export const useLocationPermission = () => {
  return useQuery({
    queryKey: taskQueriesKeys.permission(),
    queryFn: () => hasUserConsented(),
    staleTime: Infinity,
    cacheTime: Infinity,
  })
}

import { useQuery } from "@tanstack/react-query"
import { useState } from "react"

import { taskQueriesKeys } from "../../keys"
import { getLocation, getStoredCoords } from "../../services"

export const useUserLocation = () => {
  const [coords, setCoords] = useState(getStoredCoords())

  const {
    refetch: fetchLocation,
    isFetching,
    error,
  } = useQuery({
    queryKey: taskQueriesKeys.coords(),
    queryFn: async () => {
      try {
        const position = await getLocation()
        const newCoords = { lat: position.latitude, lon: position.longitude }
        localStorage.setItem("userCoords", JSON.stringify(newCoords))
        setCoords(newCoords)
        return newCoords
      } catch (error) {
        console.error("Erro ao obter localização:", error)
        throw new Error(
          "Permissão de localização negada ou erro ao obter coordenadas."
        )
      }
    },
    enabled: false,
    retry: false,
  })

  return { coords, fetchLocation, isFetching, error }
}

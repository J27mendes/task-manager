import { useQuery } from "@tanstack/react-query"

import { useFetchWeather } from "../hooks/data/useFetchWeather"
import { getLocation } from "../services"

const getStoredCoords = () => {
  const storedCoords = localStorage.getItem("userCoords")
  return storedCoords ? JSON.parse(storedCoords) : null
}

const WeatherCard = () => {
  const {
    data: coords,
    error: geoError,
    refetch: fetchLocation,
  } = useQuery({
    queryKey: ["userCoords"],
    queryFn: async () => {
      const storedCoords = getStoredCoords()
      if (storedCoords) return storedCoords

      const position = await getLocation()
      const newCoords = { lat: position.latitude, lon: position.longitude }
      localStorage.setItem("userCoords", JSON.stringify(newCoords))
      return newCoords
    },
    enabled: false,
    retry: false,
  })

  const { weather, error, isLoading } = useFetchWeather(
    coords?.lat,
    coords?.lon
  )

  return (
    <div className="flex flex-col items-center justify-center space-y-4 rounded-[10px] bg-white p-6">
      {!coords ? (
        <button
          onClick={() => fetchLocation()}
          className="rounded bg-blue-500 px-4 py-2 text-white"
        >
          Permitir acesso à localização e clima
        </button>
      ) : geoError ? (
        <p>{geoError}</p>
      ) : isLoading ? (
        <p>Carregando clima...</p>
      ) : error ? (
        <p>Erro ao obter clima: {error.message}</p>
      ) : weather ? (
        <div className="g-4 mt-10 flex flex-col items-center justify-center rounded-lg p-2 shadow-2xl">
          <div className="flex gap-3">
            <h2 className="text-xl font-bold">
              🌎 {weather.city}, {weather.country}
            </h2>
            <h3 className="text-lg">🌡️ {weather.temp_c}°C</h3>
          </div>
          <div className="flex items-center justify-center">
            <img
              src={`https:${weather.condition_icon}`}
              alt={weather.condition_text}
            />
            <h4 className="text-md">{weather.condition_text}</h4>
          </div>
          <div className="mt-2 flex flex-col items-center justify-center gap-4">
            <p>💨 Vento: {weather.wind_kph} km/h</p>
            <p>💧 Umidade: {weather.humidity}%</p>
            <p> Fase da Lua: {weather.moon_phase}</p>
          </div>
        </div>
      ) : (
        <p>Sem informações do clima.</p>
      )}
    </div>
  )
}

export default WeatherCard

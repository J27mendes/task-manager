import { useQuery } from "@tanstack/react-query"

import { taskQueriesKeys } from "../../keys"
import { translateMoonPhase } from "../../services"
import { fetchWeather } from "../../services"

export const useFetchWeather = () => {
  const {
    data: weatherData,
    error,
    isLoading,
  } = useQuery({
    queryKey: taskQueriesKeys.weather(),
    queryFn: fetchWeather,
    retry: 1,
    refetchOnWindowFocus: false,
  })

  const weather = weatherData
    ? {
        city: weatherData.location.name,
        country: weatherData.location.country,
        temp_c: weatherData.current.temp_c,
        condition_text: weatherData.current.condition.text,
        condition_icon: weatherData.current.condition.icon,
        wind_kph: weatherData.current.wind_kph,
        humidity: weatherData.current.humidity,
        moon_phase: translateMoonPhase(
          weatherData.forecast.forecastday[0].astro.moon_phase
        ),
      }
    : null

  return { weather, error, isLoading }
}

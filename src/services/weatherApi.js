import { apiWeather } from "../libs/apiWeather"
import { getLocation } from "./getLocation"

export const fetchWeather = async () => {
  try {
    const { latitude, longitude } = await getLocation()

    const { data } = await apiWeather.get("forecast.json", {
      params: {
        q: `${latitude},${longitude}`,
        days: 1,
        lang: "pt",
      },
    })

    return data
  } catch (error) {
    throw new Error(`Erro ao obter clima: ${error.message}`)
  }
}

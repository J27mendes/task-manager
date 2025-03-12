import axios from "axios"

const apiKey = import.meta.env.VITE_APIKEY

export const apiWeather = axios.create({
  baseURL: import.meta.env.VITE_WEATHER,
  params: { key: apiKey },
})

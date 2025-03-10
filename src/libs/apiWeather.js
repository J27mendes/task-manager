import axios from "axios"

const apiKey = import.meta.env.VITE_APIKEY

export const apiWeather = axios.create({
  baseURL: "http://api.weatherapi.com/v1/",
  params: { key: apiKey },
})

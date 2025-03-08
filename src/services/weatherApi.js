import axios from 'axios'

export const fetchWeather = async () => {
  if (!navigator.geolocation) {
    throw new Error('Geolocalização não suportada pelo navegador.')
  }

  return new Promise((resolve, reject) => {
    navigator.geolocation.getCurrentPosition(async (position) => {
      const { latitude, longitude } = position.coords
      const weatherUrl = `http://api.weatherapi.com/v1/forecast.json?key=${import.meta.env.VITE_APIKEY}&q=${latitude},${longitude}&days=1&lang=pt`

      try {
        const response = await axios.get(weatherUrl)
        resolve(response.data)
      } catch (error) {
        reject(error)
      }
    })
  })
}

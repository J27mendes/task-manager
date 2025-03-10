import { useFetchWeather } from "../hooks/data/useFetchWeather"

const WeatherCard = () => {
  const { weather, error, isLoading } = useFetchWeather()
  return (
    <div className="flex flex-col items-center justify-center space-y-4 rounded-[10px] bg-white p-6">
      {isLoading ? (
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

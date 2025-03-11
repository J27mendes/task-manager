export const getStoredCoords = () => {
  const storedCoords = localStorage.getItem("userCoords")
  if (!storedCoords) return null

  try {
    const parsedCoords = JSON.parse(storedCoords)
    if (parsedCoords?.lat && parsedCoords?.lon) {
      return parsedCoords
    }
    console.warn("Coordenadas inválidas no armazenamento")
    return null
  } catch (error) {
    console.error("Erro ao ler coordenadas armazenadas:", error)
    return null
  }
}

export const saveCoords = (coords) => {
  if (!coords?.lat || !coords?.lon) {
    console.error("Erro ao salvar coordenadas: formato inválido", coords)
    return
  }
  localStorage.setItem("userCoords", JSON.stringify(coords))
}

export const hasUserConsented = () => {
  return localStorage.getItem("locationPermission") === "granted"
}

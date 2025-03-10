export const translateMoonPhase = (moonPhase) => {
  const fasesLua = {
    "New Moon": "Lua Nova 🌑",
    "Waxing Crescent": "Crescente Inicial 🌒",
    "First Quarter": "Quarto Crescente 🌓",
    "Waxing Gibbous": "Crescente Gibosa 🌔",
    "Full Moon": "Lua Cheia 🌕",
    "Waning Gibbous": "Minguante Gibosa 🌖",
    "Last Quarter": "Quarto Minguante 🌗",
    "Waning Crescent": "Minguante Inicial 🌘",
  }
  return fasesLua[moonPhase] || "Fase Desconhecida"
}

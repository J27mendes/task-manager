// export const getLocation = () => {
//   return new Promise((resolve, reject) => {
//     if (!navigator.geolocation) {
//       return reject(new Error("Geolocalização não suportada pelo navegador."))
//     }

//     navigator.geolocation.getCurrentPosition(
//       (position) => resolve(position.coords),
//       (error) => reject(error)
//     )
//   })
// }
export const getLocation = () => {
  return new Promise((resolve, reject) => {
    const userConsent = window.confirm(
      "Podemos acessar sua localização para mostrar o clima local?"
    )

    if (!userConsent) {
      return reject(new Error("Permissão negada pelo usuário."))
    }

    if (!navigator.geolocation) {
      return reject(new Error("Geolocalização não suportada pelo navegador."))
    }

    navigator.geolocation.getCurrentPosition(
      (position) => resolve(position.coords),
      (error) => reject(error)
    )
  })
}

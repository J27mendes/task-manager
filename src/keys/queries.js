export const taskQueriesKeys = {
  get: () => ["TaskManager"],
  getId: (taskId) => ["task", taskId],
  weather: () => ["weatherData"],
  permission: () => ["locationPermission"],
  coords: () => ["userCoords"],
}

export const convertToSeconds = (timestamp: string): number => {
  let [hours, minutes, seconds] = timestamp.split(':').map(Number)

  if (seconds === undefined) {
    seconds = minutes
    minutes = hours
    hours = 0
  }

  return hours * 3600 + minutes * 60 + seconds
}

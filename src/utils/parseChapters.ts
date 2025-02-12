import { convertToSeconds } from './convertToSeconds'

const getTimestamp = (line: string) => {
  const regex = /(\d{0,2}:?\d{1,2}:\d{2})/g
  return line.match(regex)?.[0]
}

export const parseChapters = (description: string) => {
  const lines = description.split('\n')
  const chapters: { timestamp: string; title: string }[] = []

  let prevTime = 0
  for (let i = 0; i < lines.length; i++) {
    const line = lines[i]

    const timestamp = getTimestamp(line)
    if (!timestamp) continue

    const title = line
      .split(' ')
      .filter((l) => !l.includes(timestamp))
      .join(' ')

    const currentTime = convertToSeconds(timestamp)
    if (currentTime < prevTime) break
    prevTime = currentTime

    chapters.push({ timestamp, title })
  }

  return chapters
}

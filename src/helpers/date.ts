export const convertDatetoISO = (date: Date) => {
  return new Date(date).toISOString()
}
export const convertUnixToISODate = (date: number) => {
  const result = new Date(date * 1000).toISOString()
  return result
}

export const convertISOToUnixDate = (date: Date) => {
  const result = Math.floor(new Date(date).getTime() / 1000)
  return result
}

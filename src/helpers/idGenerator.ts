const idGenerate = () => {
  const randLetter = String.fromCharCode(65 + Math.floor(Math.random() * 26))
  return randLetter + Date.now()
}

export default idGenerate

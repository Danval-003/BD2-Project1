const express = require('express')

const app = express()
const port = 4000

app.get('/', (req, res) => {
  res.send('¡Hola, mundo!')
})

app.listen(port, () => {
  console.log(`El servidor está escuchando en http://localhost:${port}`)
})

app.get('/Bingo', (req, res) => {
  res.send('¡Hola, mundo!')
})

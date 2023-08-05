require('dotenv').config({path: '.env'})
const https = require('https')
const assert = require('assert')
const { color_green, reset } = require('../utils/it.js')

const getAllUsers = () => {
  const apiURL = `${process.env.BASE_URL}/users`

  const options = {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${process.env.API_GOREST}`,
    }
  }

  const req = https.request(apiURL, options, (res) => {
    let data = ''

    // Ler o corpo da resposta
    res.on('data', (chunk) => {
      data += chunk
    })

    res.on('end', () => {
      console.log(`\n ${color_green} Search all users ${reset} \n`)
      
      console.log('Resposta da API: \n')
      console.log(data)

      // Verificar o status code e se a resposta não está vindo vazia usando assert
      assert.strictEqual(res.statusCode, 200)
      assert.notStrictEqual(data, '', 'A resposta não está vazia')

      console.log(`\n Status code é: ${res.statusCode} \n`)
    })
  })

  req.on('error', (err) => {
    console.error('Erro na solicitação:', err.message)
  })

  req.end()
}

module.exports = { getAllUsers }

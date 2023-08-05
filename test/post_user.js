require('dotenv').config({path: '.env'})
const { fakerPT_BR: faker } = require('@faker-js/faker')
const https = require('https')
const assert = require('assert')
const { color_green, reset } = require('../utils/it.js')

let userId = ''

const postUser = () => {
  const apiURL = `${process.env.BASE_URL}/users`

  const bodyData = JSON.stringify({
    name: 'Marco Polo',
    email: faker.internet.email().toLowerCase(),
    gender: 'male',
    status: 'inactive'
  })

  const options = {
    method: 'POST',
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
      console.log(`${color_green} Create user ${reset} \n`)

      console.log('Resposta da API: \n')
      console.log(data)

      const responseBody = JSON.parse(data)

      // Verificar o status code e se a resposta não está vindo vazia usando assert
      assert.strictEqual(res.statusCode, 201)
      assert.notStrictEqual(data, '')

      console.log(`\n Status code é: ${res.statusCode} \n`)
      userId = responseBody.id
      console.log(`ID do usuário criado: ${userId} \n`)
    })
  })

  req.on('error', (err) => {
    console.error('Erro na solicitação:', err.message)
  })

  // Enviar o body da requisição
  req.write(bodyData)
  req.end()
}

module.exports = { postUser } ;
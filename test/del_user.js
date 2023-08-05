require('dotenv').config({path: '.env'})
const { fakerPT_BR: faker } = require('@faker-js/faker')
const https = require('https')
const assert = require('assert')
const { color_green, color_purple, reset } = require('../utils/it.js')

let userId = ''

const postUserToDelete = () => {
  const apiURL = `${process.env.BASE_URL}/users`

  const bodyData = JSON.stringify({
    name: 'Nathalia',
    email: faker.internet.email().toLowerCase(),
    gender: 'female',
    status: 'inactive'
  })

  const options = {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${process.env.API_GOREST}`,
    },
  }

  const req = https.request(apiURL, options, (res) => {
    let data = ''

    // Ler o corpo da resposta
    res.on('data', (chunk) => {
      data += chunk
    })

    res.on('end', () => {
      console.log(`${color_green} Create user and then delete user ${reset} \n`)

      console.log('Resposta da API: \n')
      console.log(data)

      const responseBody = JSON.parse(data)

      // Verificar o status code e se a resposta não está vindo vazia usando assert
      assert.strictEqual(res.statusCode, 201)
      assert.notStrictEqual(data, '')

      console.log(`\n Status code é: ${res.statusCode} \n`)
      userId = responseBody.id
      console.log('ID do usuário criado:', userId)
    })
  })

  req.on('error', (err) => {
    console.error('Erro na solicitação:', err.message)
  })

  // Enviar o body da requisição
  req.write(bodyData)
  req.end()
}

const delUser = () => {
  if (userId) {
    console.log(`ID do usuário para reutilizar: ${userId} \n`)
  } else {
    console.log('ID do usuário ainda não foi criado.')
  }

  const apiURL = `${process.env.BASE_URL}/users/${userId}`

  const options = {
    method: 'DELETE',
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
      console.log(`${color_purple} Delete user with ID: ${userId} ${reset}`)

      // Verificar o status code e se a resposta está vindo vazia usando assert
      assert.strictEqual(res.statusCode, 204)
      assert.strictEqual(data, '')
      console.log(`\n Status code é: ${res.statusCode} \n`)
      console.log('Deletado com sucesso!')
    })
  })

  req.on('error', (err) => {
    console.error('Erro na solicitação:', err.message)
  })

  req.end()
}

module.exports = { postUserToDelete, delUser }
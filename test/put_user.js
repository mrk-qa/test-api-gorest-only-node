require('dotenv').config({path: '.env'})
const { fakerPT_BR: faker } = require('@faker-js/faker')
const https = require('https')
const assert = require('assert')
const { color_green, color_purple, reset } = require('../utils/it.js')

let userId = ''
let userName = ''
let userEmail = ''
let userGender = ''
let userStatus = ''

function postUserToChange () {
  const apiURL = `${process.env.BASE_URL}/users`

  const bodyData = JSON.stringify({
    name: 'João',
    email: faker.internet.email().toLowerCase(),
    gender: 'male',
    status: 'active'
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
      console.log(`${color_green} Create user and then change name ${reset} \n`)

      console.log('Resposta da API: \n')
      console.log(data)

      const responseBody = JSON.parse(data)

      // Verificar o status code e se a resposta não está vindo vazia usando assert
      assert.strictEqual(res.statusCode, 201)
      assert.notStrictEqual(data, '')

      console.log(`\n Status code é: ${res.statusCode} \n`)
      userId = responseBody.id
      userName = responseBody.name
      userEmail = responseBody.email
      userGender = responseBody.gender
      userStatus = responseBody.status
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

const putUser = () => {
  if (userId) {
    console.log(`ID do usuário para reutilizar: ${userId} \n`)
  } else {
    console.log('ID do usuário ainda não foi criado. \n')
  }

  const apiURL = `${process.env.BASE_URL}/users/${userId}`

  const bodyData = JSON.stringify({
    name: `${userName} Bittencourt`,
    email: `${userEmail}`,
    gender: `${userGender}`,
    status: `${userStatus}`
  })

  const options = {
    method: 'PUT',
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
      console.log(`${color_purple} Change name ${reset} \n`)

      console.log('Resposta da API: \n')
      console.log(data)

      // Verificar o status code e se a resposta não está vindo vazia usando assert
      assert.strictEqual(res.statusCode, 200)
      assert.notStrictEqual(data, '')

      console.log(`\n Status code é: ${res.statusCode} \n`)
    })
  })

  req.on('error', (err) => {
    console.error('Erro na solicitação:', err.message)
  })

  // Enviar o body da requisição
  req.write(bodyData)
  req.end()
}

module.exports = { postUserToChange, putUser }

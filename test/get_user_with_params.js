require('dotenv').config({path: '.env'})
const https = require('https')
const assert = require('assert')
const { color_green, reset } = require('../utils/it.js')

const getUserWithParams = () => {
  const apiURL = `${process.env.BASE_URL}/users`

  const userName = 'Marco Polo'
  const userGender = 'male'

  const queryParams = `?name=${userName}&gender=${userGender}`

  const options = {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${process.env.API_GOREST}`,
    }
  }

  const req = https.request(apiURL + queryParams, options, (res) => {
    let data = ''

    // Ler o corpo da resposta
    res.on('data', (chunk) => {
      data += chunk
    })

    res.on('end', () => {
      console.log(`${color_green} Search only user with params ${reset} \n`)
      
      console.log('Resposta da API: \n')
      console.log(data)

      const responseBody = JSON.parse(data)

      // Verificar o status code, se a resposta não está vindo vazia usando assert e se o campo nome está correto de acordo com a query
      assert.strictEqual(res.statusCode, 200)
      assert.notStrictEqual(data, '')
      assert.strictEqual(responseBody[0].name, 'Marco Polo', `Esperava-se o nome 'Marco Polo' para o campo 'name', mas obteve ${responseBody[0].name}`)
      
      console.log(`\n Status code é: ${res.statusCode} \n`)
      console.log(`Resultado da query é: ${responseBody[0].name} \n`)
    })
  })

  req.on('error', (err) => {
    console.error('Erro na solicitação:', err.message)
  })

  req.end()
}

module.exports = { getUserWithParams }
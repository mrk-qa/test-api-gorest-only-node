const { getAllUsers } = require('./test/get_all_users.js')
const { postUser } = require('./test/post_user.js')
const { getUserWithParams } = require('./test/get_user_with_params.js')
const { postUserToChange, putUser } = require('./test/put_user.js')
const { postUserToDelete, delUser } = require('./test/del_user.js')
const { it, delay, color_blue, reset } = require('./utils/it.js')

async function execTestSuit() {
  console.log(`${color_blue} TEST SUITE SUMMARY ${reset} \n`)

  it('[CT01] Search all users', () => {
  })

  it('[CT02] Create user', () => {
  })

  it('[CT03] Search only user with params', () => {
  })

  it('[CT04] Create user and then change name', () => {
  })

  it('[CT05] Create user and then delete user', () => {
  })

  console.log('\n ----------------------------------------------------------------------------------------------------------------------- \n')

  const tests = [getAllUsers, postUser, getUserWithParams, postUserToChange, putUser, postUserToDelete, delUser]

  for (const sequence of tests) {
    sequence()
    await delay(2000)
  }
}

execTestSuit()

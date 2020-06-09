'using strict'

// check is user exists in the database 
let SignUpEmail = function (users, email) {
  let notFound = -1
  let emailexist = false
  let indexOfUserEmail = users.findIndex(function (user) {
    return user.email === email
  })

  if (indexOfUserEmail === notFound) {
    emailexist = true
  }
  return emailexist
}

module.exports = {
  SignUpEmail: SignUpEmail
}

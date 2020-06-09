'use strict'

// password verification
let checkPasswordMatch = function () {
  let password = document.getElementById('password').value
  let confirmPassword = document.getElementById('confirmPassword').value

  if (password === confirmPassword) {
    document.getElementById('confirmPasswordMessage').style.color = 'green'
    document.getElementById('confirmPasswordMessage').innerHTML = 'match'
  } else {
    document.getElementById('confirmPasswordMessage').style.color = 'red'
    document.getElementById('confirmPasswordMessage').innerHTML = 'does not match'
  }
}

let checkPasswordLength = function () {
  let password = document.getElementById('password').value

  if (password.length < 8) {
    document.getElementById('passwordMessage').style.color = 'red'
    document.getElementById('passwordMessage').innerHTML = 'weak password, use 8 characers or more'
  } else {
    document.getElementById('passwordMessage').style.color = 'green'
    document.getElementById('passwordMessage').innerHTML = 'strong password'
  }
}


let signUp = document.getElementById('signUpButton')

// User cannot proceed if passwords do not match
signUp.addEventListener('click', function () {
  let password = document.getElementById('password').value
  let confirmPassword = document.getElementById('confirmPassword').value

  if (confirmPassword !== password) {
    window.alert('Passwords do not match!!')
  }
})

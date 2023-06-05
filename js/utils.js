// Defindo referências para elementos da página
var authForm = document.getElementById('authForm')
var authFormTitle = document.getElementById('authFormTitle')
var register = document.getElementById('register')
var access = document.getElementById('access')
var loading = document.getElementById('loading')
var auth = document.getElementById('auth')
var userContent = document.getElementById('userContent')
var userEmail = document.getElementById('userEmail')
var sendEmailVerificationDiv = document.getElementById('sendEmailVerificationDiv');
var emailVerified = document.getElementById('emailVerified')
var passwordReset = document.getElementById('passwordReset')
var userName = document.getElementById('userName')
var userImg = document.getElementById('userImg')

var app = document.getElementById('app')
var game = document.getElementById('game')

var todoForm = document.getElementById('todoForm')
var todoCount = document.getElementById('todoCount')
var ulTodoList = document.getElementById('ulTodoList')

// Alterar o formulário de autenticação para o cadastro de novas contas
function toggleToRegister() {
  authForm.submitAuthForm.innerHTML = 'Cadastrar conta'
  authFormTitle.innerHTML = 'Insira seus dados para se cadastrar'
  hideItem(register)
  showItem(access)

  hideItem(passwordReset)
}

// Alterar o formulário de autenticação para o acesso de contas já existentes
function toggleToAccess() {
  authForm.submitAuthForm.innerHTML = 'Acessar'
  authFormTitle.innerHTML = 'Acesse a sua conta para continuar'
  hideItem(access)
  showItem(register)
  showItem(passwordReset)
}

// Simpplifica a exibição de elementos da página
function showItem(element) {
  element.style.display = 'block'
}
function showGame(element) {
    element.style.display = 'flex'
  }

  function showGame(element) {
    element.style.display = 'flex'
  }

// Simplifica a remoção de elementos da página
function hideItem(element) {
  element.style.display = 'none'
}

function showUserContent (user) {
  if (user.providerData[0].providerId != 'password') {
    emailVerified.innerHTML = "Email nao precisa ser verificado"
    hideItem(sendEmailVerificationDiv)
  } else {
    if(user.emailVerified) {
      emailVerified.innerHTML = "Email verificado"
      hideItem(sendEmailVerificationDiv)
    } else {
      emailVerified.innerHTML = "Email não verificado"
      showItem(sendEmailVerificationDiv)
    }
  }


userImg.src = user.photoURL ? user.photoURL  : 'img/unknownUser.png'
userName.innerHTML = user.displayName

userEmail.innerHTML = user.email
hideItem(auth)

dbRefUsers.child(firebase.auth().currentUser.uid).on('value', function (dataSnapshot) {
  fillTodoList(dataSnapshot)
})

showItem(userContent)
}

function showAuth () {
  authForm.email.value = ""
  authForm.password.value = ""
  hideItem(userContent)
  showItem(auth)
}

function showError (prefix, error) {
  console.log(error.code)
  hideItem(loading);
  switch(error.code) {
    case 'auth/invalid-email': alert(prefix + ' ' + 'Email invalido')
    break;

    case 'auth/wrong-password': alert(prefix + ' ' + 'Senha invalida')
    break;

    case 'auth/weak-password': alert(prefix + '' + 'Senha deve ter pelo menos 6 caracteres')
    break;

    case 'auth/email-already-in-use': alert(prefix + '' + 'Email ja esta sendo utilizado por outra conta')
    break;

    default: alert(prefix + ' ' + error.message)
  
  }
}


var actionCodeSettings = {
  url: 'https://matheuszufi.github.io/TibiaWeb/'
}


var database = firebase.database()
var dbRefUsers = database.ref('users')
firebase.auth().languageCode = 'pt-BR'

authForm.onsubmit = function (event) {
    showItem(loading)
    event.preventDefault()
    if (authForm.submitAuthForm.innerHTML == 'Acessar') {
        firebase.auth().signInWithEmailAndPassword(authForm.email.value, authForm.password.value).catch(function (error) {
         showError('Falha no acesso: ', error)
        })
    } else {
        firebase.auth().createUserWithEmailAndPassword(authForm.email.value, authForm.password.value).catch(function (error) {
            showError('Falha no cadastro: ', error)
        })
    }

}

firebase.auth().onAuthStateChanged(function(user) {
    hideItem(loading)
    if (user) {
        showUserContent(user)
    } else {
        showAuth()
    }
})

function signOut() {
    firebase.auth().signOut().catch(function (error) {
        showError('Falha ao sair da conta:', error)
    })
}

function sendEmailVerification() {
    showItem(loading)
    var user = firebase.auth().currentUser
    user.sendEmailVerification(actionCodeSettings).then(function () {
        alert('Email de verificação foi enviado para ' + user.email + '. Verifique sua caixa de emails')
    }).catch(function (error) {
        showError('Falha ao enviar o email de verificação:', error)

    }).finally(function () {
        hideItem(loading)
    })
}


// Redefinição de senha 

function sendPasswordResetEmail () {
    var email = prompt('Redefinir senha. Informe o seu email.', authForm.email.value)
    if(email) {
        showItem(loading)


        firebase.auth().sendPasswordResetEmail(email, actionCodeSettings).then(function() {
            alert('Email de redefinição de senha foi enviado para ' + email + '.')
        }).catch(function (error) {
            showError('Falha ao redefinir senha:', error)
        }).finally(function () {
            hideItem(loading)
        })

    } else {
        alert('É preciso preencher o campo de email para redefinir a senha')
    }
}



function signInWithGoogle() {
    showItem(loading)
    firebase.auth().signInWithRedirect(new firebase.auth.GoogleAuthProvider()).catch(function (error) {    
        showError('Houve um erro ao autenticar usando o Google:', error)

    })
}

function signInWithGitHub() {
    showItem(loading)
    firebase.auth().signInWithRedirect(new firebase.auth.GithubAuthProvider()).catch(function (error) {
        showError('Houve um erro ao autenticar usando o GitHub:', error)
        
    })
}

function signInWithFacebook() {
    showItem(loading)
    firebase.auth().signInWithRedirect(new firebase.auth.FacebookAuthProvider()).catch(function (error) {
        showError('Houve um erro ao autenticar usando o Facebook:', error)

    })
}


function updateUserName () {

    var newUserName = prompt('Informe um novo nome de usuario.', userName.innerHTML)
    if (newUserName) {
        userName.innerHTML = newUserName
        showItem(loading)
        firebase.auth().currentUser.updateProfile({
            displayName: newUserName
        }).catch(function (error) {
            showError('Houve um erro ao mudar seu nome:', error)

        }).finally(function () {
            hideItem(loading)
        })
    } else {
        alert('O nome de usuario nao pode ficar em branco')
    }
}

function deleteUserAccount () {
    var confirmation = confirm('Quer realmente excluir sua conta?')
    if (confirmation) {
            showItem(loading)
            firebase.auth().currentUser.delete().then(function () {
                alert('Sua conta foi excluida com sucesso')
            }).catch(function (error) {
                showError('Houve um erro com a exclusão da conta:', error)
            }).finally(function () {
                hideItem(loading)
            })

    }
}
// Referência para o formulário
var todoForm = document.getElementById('todoForm');

// Referência para a lista de tarefas
var ulTodoList = document.getElementById('todoList');

// Função para criar um novo character
todoForm.onsubmit = function(event) {
    event.preventDefault(); // Evita o redirecionamento da página

    if (todoForm.name.value !== '') {
        var data = {
            name: todoForm.name.value,
            level: 0,
            initialPosX: 0,
            initialPosY: 0,
            initialScreenX: 800,
            initialScreenY: 400,
            isLoggedIn: false
        };

        dbRefUsers.child(firebase.auth().currentUser.uid).push(data)
            .then(function() {
                console.log('Character created!');
            })
            .catch(function(error) {
                showError('Falha ao adicionar tarefa:', error);
            });
    } else {
        alert('O formulário não pode estar vazio');
    }
};

// Função para preencher a lista de tarefas
function fillTodoList(dataSnapshot) {
    ulTodoList.innerHTML = '';

    dataSnapshot.forEach(function(item) {
        var value = item.val();

        var li = document.createElement('li');
        var spanLi = document.createElement('span');
        spanLi.appendChild(document.createTextNode(value.name));
        spanLi.setAttribute('class', 'nameCharacter');
        li.setAttribute('class', 'characters');
        spanLi.id = item.key;
        li.appendChild(spanLi);
        ulTodoList.appendChild(li);

        var levelLi = document.createElement('span');
        levelLi.appendChild(document.createTextNode(value.level));
        li.appendChild(levelLi);

        var playLi = document.createElement('button');
        li.appendChild(playLi);
        playLi.setAttribute('class', 'playBtn fa-solid fa-play');
        playLi.setAttribute('onclick', 'playWithChar("' + item.key + '")');

        var liRemoveChar = document.createElement('button');
        liRemoveChar.appendChild(document.createTextNode(''));
        liRemoveChar.setAttribute('onclick', 'removeTodo("' + item.key + '")');
        liRemoveChar.setAttribute('class', 'danger todoBtn fa-solid fa-trash');

        li.appendChild(liRemoveChar);
    });
}

// Função para remover uma tarefa
function removeTodo(key) {
    var selectedItem = document.getElementById(key);

    var confirmation = confirm('Deseja realmente remover a tarefa ' + selectedItem.innerHTML + '?');
    if (confirmation) {
        dbRefUsers.child(firebase.auth().currentUser.uid).child(key).remove()
            .catch(function(error) {
                showError('Falha ao remover tarefa:', error);
            });
    }
}

var world = document.getElementById('world');

firebase.auth().onAuthStateChanged(function(user) {
    if (user) {
        // O usuário está autenticado, execute o código aqui
        var dbRefCharacter = dbRefUsers.child(user.uid);

        // Restante do código aqui...
    }
});

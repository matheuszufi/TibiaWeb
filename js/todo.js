todoForm.onsubmit = function(event) {
    event.preventDefault() //evita o redirecionamento da pagina
    if (todoForm.name.value != '') {
        var data = {
            name: todoForm.name.value,
            level: 0,

        }

        dbRefUsers.child(firebase.auth().currentUser.uid).push(data).then(function () {
            console.log('tarefa adicionada com sucesso!')
        }).catch(function (error) {
            showError('Falha ao adicionar tarefa:', error)
        })


    } else {
        alert ('formulario nao pode estar vazio')
    }

}


// Exibir a lista 

function fillTodoList (dataSnapshot) {
    ulTodoList.innerHTML = ''
   
     
    dataSnapshot.forEach(function (item) {
        var value = item.val()

        var li = document.createElement('li')
        var spanLi = document.createElement('span')
        spanLi.appendChild(document.createTextNode(value.name)) 
        spanLi.setAttribute('class', 'nameCharacter')
        li.setAttribute('class', 'characters')
        spanLi.id = item.key
        li.appendChild(spanLi)
        ulTodoList.appendChild(li)

        var levelLi = document.createElement('span')
        levelLi.appendChild(document.createTextNode(value.level))
        // levelLi.setAttribute('class', 'fa-solid fa-play' )
        li.appendChild(levelLi)

      
      
        var playLi = document.createElement('button')
        li.appendChild(playLi)
        playLi.setAttribute('class', 'playBtn fa-solid fa-play')
        playLi.setAttribute('onclick', 'playWithChar(\"' + item.key + '\")')
        

        var liRemoveChar = document.createElement('button')
        liRemoveChar.appendChild(document.createTextNode(''))
        liRemoveChar.setAttribute('onclick', 'removeTodo(\"' + item.key + '\")')
        liRemoveChar.setAttribute('class', 'danger todoBtn fa-solid fa-trash')
     
        li.appendChild(liRemoveChar)

    })
}


function removeTodo(key) {
    var selectedItem = document.getElementById(key)

    var confirmation = confirm('Deseja realmente remover a tarefa ' + selectedItem.innerHTML + '?')
    if(confirmation) {
        dbRefUsers.child(firebase.auth().currentUser.uid).child(key).remove().catch(function (error) {
            showError('falha ao remover tarefa:', error);
        })
    }
}







 ////
 ////
 ////
 ////
 ////


var world = document.getElementById('world');

 function playWithChar(key) {
    dbRefUsers.child(firebase.auth().currentUser.uid).child(key).once('value').then(function (snapshot) {
        var characterData = snapshot.val();
        // Aqui você pode utilizar os dados do personagem como desejar
        hideItem(app)
        showGame(game)

        
        
        
        
        
        
        var newChar = document.createElement('div');
        newChar.setAttribute('id', 'character')
        world.appendChild(newChar)
    
        
  
        console.log(characterData);
      })
      .catch(function (error) {
        showError('Falha ao obter dados do personagem:', error);
      });
  }
  


var worldStartX = 0;
var worldStartY = 0;
function playWithChar(key) {
    if (!firebase.auth().currentUser) {
      console.log('Usuário não autenticado');
      return;
    }
  
    var dbRefCharacter = dbRefUsers.child(firebase.auth().currentUser.uid).child(key);
  
    dbRefCharacter.once('value')
      .then(function(snapshot) {
        var characterData = snapshot.val();
        // Aqui você pode utilizar os dados do personagem como desejar
  
        hideItem(app);
        showGame(game);
        console.log(characterData);
  
        var newChar = document.createElement('div');
        newChar.setAttribute('id', 'character');
  
        var { initialPosX, initialPosY, initialScreenX, initialScreenY } = characterData;
  
        let playerPosX = initialPosX;
        let playerPosY = initialPosY;
        var worldStartX = initialScreenX;
        var worldStartY = initialScreenY;
  
        dbRefCharacter.update({
            isLoggedIn: true
          })
          .then(function() {
            console.log('Status de isLoggedIn atualizado para true');
          })
          .catch(function(error) {
            console.log('Erro ao atualizar o status de isLoggedIn:', error);
          });
  
        newChar.style.transform = `translate(${playerPosY}px, ${playerPosX}px)`;
        world.style.transform = `translate(${worldStartX}px, ${worldStartY}px)`;
        world.appendChild(newChar);
  
        var charNameUi = document.createElement('div');
        charNameUi.innerHTML = characterData.name;
        newChar.appendChild(charNameUi);
  
        document.addEventListener('keydown', function(event) {
          var btnA = 'a';
          var btnW = 'w';
          var btnD = 'd';
          var btnS = 's';
  
          if (event.key === btnA || event.keyCode === 37) {
            playerPosY -= 50;
            newChar.style.transform = `translate(${playerPosY}px, ${playerPosX}px)`;
            worldStartX += 50;
            world.style.transform = `translate(${worldStartX}px, ${worldStartY}px)`;
  
            dbRefCharacter.update({
                initialPosX: playerPosX,
                initialPosY: playerPosY,
                initialScreenX: worldStartX,
                initialScreenY: worldStartY
              })
              .catch(function(error) {
                showError('Falha ao atualizar as coordenadas do personagem:', error);
              });
          } else if (event.key === btnW || event.keyCode === 38) {
            playerPosX -= 50;
            newChar.style.transform = `translate(${playerPosY}px, ${playerPosX}px)`;
            worldStartY += 50;
            world.style.transform = `translate(${worldStartX}px, ${worldStartY}px)`;
  
            dbRefCharacter.update({
                initialPosX: playerPosX,
                initialPosY: playerPosY,
                initialScreenX: worldStartX,
                initialScreenY: worldStartY
              })
              .catch(function(error) {
                showError('Falha ao atualizar as coordenadas do personagem:', error);
              });
          } else if (event.key === btnD || event.keyCode === 39) {
            playerPosY += 50;
            newChar.style.transform = `translate(${playerPosY}px, ${playerPosX}px)`;
            worldStartX -= 50;
            world.style.transform = `translate(${worldStartX}px, ${worldStartY}px)`;
  
            dbRefCharacter.update({
                initialPosX: playerPosX,
                initialPosY: playerPosY,
                initialScreenX: worldStartX,
                initialScreenY: worldStartY
              })
              .catch(function(error) {
                showError('Falha ao atualizar as coordenadas do personagem:', error);
              });
          } else if (event.key === btnS || event.keyCode === 40) {
            playerPosX += 50;
            newChar.style.transform = `translate(${playerPosY}px, ${playerPosX}px)`;
            worldStartY -= 50;
            world.style.transform = `translate(${worldStartX}px, ${worldStartY}px)`;
  
            dbRefCharacter.update({
                initialPosX: playerPosX,
                initialPosY: playerPosY,
                initialScreenX: worldStartX,
                initialScreenY: worldStartY
              })
              .catch(function(error) {
                showError('Falha ao atualizar as coordenadas do personagem:', error);
              });
          }
        });
      })
      .catch(function(error) {
        showError('Falha ao obter dados do personagem:', error);
      });
  }
  
  function logOutChar(key) {
   
    var dbRefCharacter = dbRefUsers.child(firebase.auth().currentUser.uid).child(isLoggedIn);
  
    dbRefCharacter.update({
        isLoggedIn: false
      });
  }
  
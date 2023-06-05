


function playWithChar(key) {
    var dbRefCharacter = dbRefUsers.child(firebase.auth().currentUser.uid).child(key);

    dbRefCharacter.once('value')
        .then(function(snapshot) {
            var characterData = snapshot.val();
            // Aqui você pode utilizar os dados do personagem como desejar

            hideItem(app);
            showGame(game);
            console.log(characterData)
            
            var newChar = document.createElement('div')
            newChar.setAttribute('id', 'character')

          
            var initialPosX = characterData.initialPosX; // Valor de initialPosX do Firebase
            var initialPosY = characterData.initialPosY; // Valor de initialPosY do Firebase  
            var fbInitialScreenPosX = characterData.initialScreenX; // Valor de initialPosX do Firebase
            var fbInitialScreenPosY = characterData.initialScreenY; // Valor de initialPosY do Firebase

            let playerPosX = initialPosX;
            let playerPosY = initialPosY;
            var worldStartX = fbInitialScreenPosX;
            var worldStartY = fbInitialScreenPosY;

            dbRefCharacter.update({
                isLoggedIn: true
            })  


            newChar.style.transform = 'translate(' + playerPosY + 'px, ' + playerPosX + 'px)';
            world.style.transform = 'translate(' + worldStartX + 'px, ' + worldStartY + 'px)';
            world.appendChild(newChar);

            var charNameUi = document.createElement('div')
            charNameUi.innerHTML = characterData.name;
            newChar.appendChild(charNameUi)


            document.addEventListener('keydown', function(event) {
                var btnA = 'a';
                var btnW = 'w';
                var btnD = 'd';
                var btnS = 's';

                if (event.key === btnA || event.keyCode === 37) {
                    playerPosY = playerPosY - 50;
                    newChar.style.transform = 'translate(' + playerPosY + 'px, ' + playerPosX + 'px)';
                    worldStartX = worldStartX + 50;
                    world.style.transform = 'translate(' + worldStartX + 'px, ' + worldStartY + 'px)';

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
                    playerPosX = playerPosX - 50;
                    newChar.style.transform = 'translate(' + playerPosY + 'px, ' + playerPosX + 'px)';
                    worldStartY = worldStartY + 50;
                    world.style.transform = 'translate(' + worldStartX + 'px, ' + worldStartY + 'px)';

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
                    playerPosY = playerPosY + 50;
                    newChar.style.transform = 'translate(' + playerPosY + 'px, ' + playerPosX + 'px)';
                    worldStartX = worldStartX - 50;
                    world.style.transform = 'translate(' + worldStartX + 'px, ' + worldStartY + 'px)';

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
                    playerPosX = playerPosX + 50;
                    newChar.style.transform = 'translate(' + playerPosY + 'px, ' + playerPosX + 'px)';
                    worldStartY = worldStartY - 50;
                    world.style.transform = 'translate(' + worldStartX + 'px, ' + worldStartY + 'px)';

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

    // var logOutBtn = document.createElement('button')
    // logOutBtn.setAttribute('id', 'logOutBtn')
    // world.appendChild(logOutBtn)
    // var logOutBtnI = document.createElement('i')
    // logOutBtnI.setAttribute('class', 'fa-solid fa-right-from-bracket')
    // logOutBtnI.setAttribute('id', 'logOutBtn')
    // logOutBtn.appendChild(logOutBtnI);

    // var logOutBtnP = document.createElement('p')
    // logOutBtnP.innerHTML = "Logout"
    // logOutBtn.appendChild(logOutBtnP)
    

}

function logout (snapshot) {
    dbRefCharacter.once('value')
    .then(function(snapshot) {
        var characterDataLogOut = snapshot.val();

        dbRefCharacter.update({
            isLoggedIn: false
        })  

        characterDataLogOut.isLoggedIn = false
    })
  


}
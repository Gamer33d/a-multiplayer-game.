export function setupScreen(state, canvas){
  const { screen } = state
  canvas.width = screen.width
  canvas.height = screen.height
}

function updatePointsTable(game, scoreTable, currentPlayerId){
  const players = []
  let html = 
  `<tr class="table-header">
  <td>Top 10 Jogadores</td>
  <td>Pontos</td>
  </tr>`
  for (const playerId in game.state.players) {
    const playerData = game.state.players[playerId]
    players.push({
      playerId,
      ...playerData
    })
  }

  players.sort((a,b) => {
    if( a.points > b.points ){
      return -1
    }else{
      return 1
    }
  })


  for (let i = 0; i <= 10; i++) {
    if(players[i]){
      const playerId = players[i].playerId
      html += `
      <tr class='${ currentPlayerId == playerId ? 'current-player' : '' }'>
        <td class="socket-id">${playerId}</td>
        <td class="score-value">${players[i].points}</td>
      </tr>
      `
    }
  }
  
  scoreTable.innerHTML = html
  
}

export function renderScreen(screen, game, requestAnimationFrame, currentPlayerId, scoreTable){
  const context = screen.getContext('2d')
  

  /*Limpa a tela ao renderizar novo frame*/
  context.clearRect(0,0, screen.width, screen.height)

  for (const playerId in game.state.players) {
    const player = game.state.players[playerId]
    context.fillStyle = 'black'
    context.fillRect(player.x, player.y, 1, 1)
  }

  for (const fruitId in game.state.fruits){
    const fruit = game.state.fruits[fruitId]
    context.fillStyle = 'green'
    context.fillRect(fruit.x, fruit.y, 1, 1)
  }

  const currentPlayer = game.state.players[currentPlayerId]
  if(currentPlayer){
    context.fillStyle = "#F0DB4F"
    context.fillRect(currentPlayer.x, currentPlayer.y, 1, 1)
    updatePointsTable(game, scoreTable, currentPlayerId)
  }


  requestAnimationFrame(() => {
    renderScreen(screen, game, requestAnimationFrame, currentPlayerId, scoreTable)
  })
}
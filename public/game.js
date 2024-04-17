export function createGame(screenWidth = 10, screenHeight = 10){ /*Factory Pattern*/
    const state = { 
        players: {},
        fruits: {},
        screen: {
            width: screenWidth,
            height: screenHeight
        },
    }

    const observers = []

    function subscribeObserver(observerFunction){
       observers.push(observerFunction)
    }

    function notifyAll(command){
        // console.log(`Notifying ${observers.length} observers`)
  
        for (const observerFunction of observers) {
            observerFunction(command)
        }
    }
 
    function start(frequency = 2000){
        setInterval(addFruit, frequency)
    }

    function setState(newState){
        Object.assign(state, newState)
    }

    function setPoints(command){
        const playerId = command.playerId
        const newPoints = command.points
        const player = state.players.points[playerId]
        player.points = newPoints
    }

    function addPlayer(command){
        const { playerId } = command
        const playerX = 'playerX' in command ? command.playerX :  Math.floor(Math.random() * state.screen.width)
        const playerY = 'playerY' in command ? command.playerY :  Math.floor(Math.random() * state.screen.height)
        

        state.players[playerId] = {
            x: playerX,
            y: playerY,
            points: 0
        }

        notifyAll({
            type: "add-player",
            playerId,
            playerX,
            playerY,
            points: 0
        })
    }

    function removePlayer(command){
        const { playerId } = command
        
        delete state.players[playerId]
        notifyAll({
            type: "remove-player",
            playerId
        })
    }

    function addFruit(command){
        const fruitId = command ? command.fruitId : Math.floor(Math.random() * 10000000)
        const fruitX = command ? command.fruitX :  Math.floor(Math.random() * state.screen.width)
        const fruitY = command ? command.fruitY :  Math.floor(Math.random() * state.screen.height)
        
        let isExistsAFruitInThisPosition = false

        for (const otherFruitId in state.fruits) {
            const otherFruit = state.fruits[otherFruitId]
            if(otherFruit.x == fruitX && otherFruit.y == fruitY){
                isExistsAFruitInThisPosition = true
            }
        }

        if(isExistsAFruitInThisPosition){
            return
        }

        state.fruits[fruitId] = {
            x: fruitX,
            y: fruitY
        }

        notifyAll({
            type: "add-fruit",
            fruitId,
            fruitX,
            fruitY
        })
    }

    function removeFruit(command){
        const { fruitId } = command

        delete state.fruits[fruitId]
        
        notifyAll({
            type: "remove-fruit",
            fruitId
        })
    }

    function addPointToAPlayer(command){
        const playerId = command.playerId
        const player = state.players[playerId]
        console.log(command)
        player.points += 1
        notifyAll({
            type: "add-point-to-a-player",
            playerId,
            currentPoints: player.points
        })
    }

    function movePlayer(command){
        // console.log(`Moving player ${command.playerId} with ${command.keyPressed}.`)
        notifyAll(command)

        const acceptedMoves = { //Ele ja transforma o nome da função em chave
            ArrowUp(player){
                if(player.y - 1 < 0){
                    player.y = state.screen.height - 1
                    return
                }
                player.y -= 1
            },
            ArrowDown(player){
                if(player.y + 1 > state.screen.height - 1){
                    player.y = 0
                    return
                }   
                
                player.y++
            },
            ArrowRight(player){
                if(player.x + 1 > state.screen.width - 1){
                    player.x = 0
                    return
                }
                player.x++
            },
            ArrowLeft(player){
                if(player.x - 1 < 0){
                    player.x = state.screen.width - 1
                    return
                }
                player.x -= 1
            }
        }
        const { keyPressed, playerId } = command
        const player = state.players[playerId]
        const moveFunction = acceptedMoves[keyPressed]

        if(moveFunction && player) {
            moveFunction(player)
            checkForFruitCollision(playerId)
        }
    }

    function checkForFruitCollision(playerId){
        const player = state.players[playerId]
        for (const fruitId in state.fruits) {
            const fruit = state.fruits[fruitId]
            if(player.x == fruit.x && player.y == fruit.y){
                removeFruit({ fruitId })
                addPointToAPlayer({ playerId })
            }
        }
    }

    return {
        state,
        movePlayer,
        addPointToAPlayer,
        addPlayer,
        removePlayer,
        addFruit,
        removeFruit,
        setState,
        subscribeObserver,
        start,
        setPoints
    }
}
import express from 'express'
import http from 'http'
import { createGame } from './public/game.js'
import { Server } from 'socket.io'

const port = process.env.PORT || 3000
const app = express()
const server = http.createServer(app)
const sockets = new Server(server)

app.use(express.static("public"))

const game = createGame(20, 20)
game.subscribeObserver((command) => {
    console.log(`> Emitting ${command.type}`)
    sockets.emit(command.type, command)
})

game.start(3000)
sockets.on("connection", (socket) => {
    const playerId = socket.id
    console.log(`Socket ${playerId} connected.`)
    
    game.addPlayer({ playerId })

    socket.emit("setup", game.state)

    socket.on("disconnect", () => {
        game.removePlayer({ playerId });
        console.log(`> Player disconnected: ${playerId}`)
    })

    socket.on('move-player', (command) => {
        command.playerId = command.playerId
        command.type = 'move-player'

        game.movePlayer(command)
    })
})

server.listen(3000, () => {
    console.log(`> Server listening on port: ${port}`)
})
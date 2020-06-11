const express = require('express')
const app = express()
const server = require('http').createServer(app)
const io = require('socket.io').listen(server)
const cors = require('cors')
const moment = require('moment')
const {
  divideCards
} = require('./resource')

app.use(cors())
app.use(express.static('public'))

app.get('/', (req, res)=>{
  res.sendFile(`${ __dirname }/views/index.html`)
})

server.listen(process.env.PORT || 3005)

let players = []
const size = 4
const currentCards = []
let round = 1
let winners = []

let playersCard = []

const updatePlayers = (socket)=>{
  if(players.length <= size){
    players.push(socket)
    if(players.length == size){

      playersCard = divideCards(size)
      for (var i = 0; i < players.length; i++) {
        io.to(`${players[i].id}`).emit('START', playersCard[i]);
      }
      io.to(`${players[0].id}`).emit('TOKEN', true)
    }else{
      //io.to(`${players[i].id}`).emit('START', []);
    }
  }
}

io.sockets.on('connection', (socket)=>{
  console.log('Connected: ')
  updatePlayers(socket)

  socket.on('disconnect', (data)=>{

  })

  socket.on('ON_MOVE', (card, player)=>{
    io.to(`${player}`).emit('TOKEN', false)

    if(round == players){
      currentCards = [card]
      round = 1
    }else{
      currentCards.push(card)
      round++
    }
    playersCard[i].splice(playersCard[i].indexOf(card), 1)

    if(checkWinners()){
      moveToken(++index)
    }
  })

  const moveToken = (index)=>{
    for (var i = index; i < size; i++) {
      if(playersCard[i].length>0){
        io.to(`${players[i].id}`).emit('TOKEN', true)
        break
      }
    }
    return null
  }

  const checkWinners = ()=>{
    let lose = 0;

    for (var i = 0; i < size; i++) {
      if(winners.includes(players[i])){
        continue
      }else if(playersCard[i].length == 0){
        winners.push(players[i])
      }else{
        lose++
      }
    }

    if(lose == 3){
      for (var i = 0; i < size; i++) {
        if(!winners.includes(players[i])){
          //send result
          return false
        }
      }
    }else{
      return true
    }
  }

  const sendResult = ()=>{
    let result = []
    for (var i = 0; i < winners.length; i++) {
      result = i
    }
    for (var i = 0; i < size; i++) {
      io.to(`${players[i].id}`).emit('TOKEN', false)
      io.to(`${players[i].id}`).emit('RESULT', result)
    }
  }
})

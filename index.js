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
let currentCards = []
let winners = []
let playersCard = []
let history = []

const updatePlayers = ()=>{
  if(players.length == size){
    playersCard = divideCards(size)
    for (var i = 0; i < players.length; i++) {
      io.to(`${players[i].id}`).emit('START', playersCard[i])
    }
    io.to(`${players[0].id}`).emit('TOKEN', true)
  }else{
    for (var i = 0; i < players.length; i++) {
      io.to(`${players[i].id}`).emit('START', playersCard[i])
      io.to(`${players[i].id}`).emit('TOKEN', false)
    }
  }
}

io.sockets.on('connection', (socket)=>{
  console.log('Connected: ')
  players.push(socket)
  updatePlayers()

  socket.on('disconnect', (data)=>{
    players.splice(data, 1)
    currentCards = []
    winners = []
    history = []
  })

  const sendCurrentCards = ()=>{
    for (var i = 0; i < players.length; i++) {
      io.to(`${players[i].id}`).emit('CURRENT_CARDS', currentCards)
    }
  }

  const sendHistory = ()=>{
    for (var i = 0; i < players.length; i++) {
      console.log('history ', history[i]);
      // io.to(`${players[i].id}`).emit('HISTORY', history)
    }
  }

  const sendCards = (index, card, playerCard)=>{
    for (var i = 0; i < players.length; i++) {
      if(playersCard[i].includes(card)>-1){
        playersCard[i] = playerCard
        break;
      }
    }
    console.log('index ', index);
    if(checkWinners()){
      moveToken(index)
    }
  }

  socket.on('ON_MOVE', (id, card, playerCard)=>{
    let index = 0
    const payload = {
      id: id,
      card: card
    }

    if(currentCards.length == size - 1){
      currentCards.push(payload)
      index = checkBig()
      sendCurrentCards()
      history.push(currentCards)
      currentCards = []
      sendHistory()
      sendCards(index, card, playerCard)
      setTimeout(()=>{
        sendCurrentCards()
      }, 1000)
    }else{
      currentCards.push(payload)
      sendCurrentCards()
      index = index == size? 0: ++index
      sendCards(index, card, playerCard)
    }

  })

  const checkBig = ()=>{
    let big = 0
    for (var i = 1; i < currentCards.length; i++) {
      if(currentCards[i-1].card.type == currentCards[i].card.type && currentCards[i-1].card.num < currentCards[i].card.num){
        big = i
      }
    }
    return big
  }

  const moveToken = (index)=>{
    index = index < 4? index : 0
    if(playersCard[index].length>0){
      io.to(`${players[index].id}`).emit('TOKEN', true)
    }
  }

  const checkWinners = ()=>{
    let lose = 0;

    for (var i = 0; i < players.length; i++) {
      if(winners.includes(players[i])){
        continue
      }else if(playersCard[i].length == 0){
        winners.push(players[i])
      }else{
        lose++
      }
    }

    if(lose == 3){
      for (var i = 0; i < players.length; i++) {
        if(!winners.includes(players[i])){
          sendResult()
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
    for (var i = 0; i < players.length; i++) {
      io.to(`${players[i].id}`).emit('TOKEN', false)
      io.to(`${players[i].id}`).emit('RESULT', result)
    }
  }
})

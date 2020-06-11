const {
  divideCards
} = require('./resource')

let players = []
const size = 4
const currentCards = []
let round = 1
let winners = []

let playersCard = divideCards(size)

const dropCard = (card, i)=>{
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
}

const moveToken = (index)=>{
  for (var i = index; i < size; i++) {
    if(playersCard[i].length>0){
      let current = players[i]
      //return token to next
      break
    }
  }
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

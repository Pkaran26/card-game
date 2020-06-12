const cards = [
  {
    id: '2H',
    type: 'H',
    num: 2
  },
  {
    id: '3H',
    type: 'H',
    num: 3
  },
  {
    id: '4H',
    type: 'H',
    num: 4
  },
  {
    id: '5H',
    type: 'H',
    num: 5
  },
  {
    id: '6H',
    type: 'H',
    num: 6
  },
  {
    id: '7H',
    type: 'H',
    num: 7
  },
  {
    id: '8H',
    type: 'H',
    num: 8
  },
  {
    id: '9H',
    type: 'H',
    num: 9
  },
  {
    id: '10H',
    type: 'H',
    num: 10
  },
  {
    id: 'JH',
    type: 'H',
    num: 11
  },
  {
    id: 'QH',
    type: 'H',
    num: 12
  },
  {
    id: 'KH',
    type: 'H',
    num: 13
  },
  {
    id: 'AH',
    type: 'H',
    num: 14
  },
  {
    id: '2C',
    type: 'C',
    num: 2
  },
  {
    id: '3C',
    type: 'C',
    num: 3
  },
  {
    id: '4C',
    type: 'C',
    num: 4
  },
  {
    id: '5C',
    type: 'C',
    num: 5
  },
  {
    id: '6C',
    type: 'C',
    num: 6
  },
  {
    id: '7C',
    type: 'C',
    num: 7
  },
  {
    id: '8C',
    type: 'C',
    num: 8
  },
  {
    id: '9C',
    type: 'C',
    num: 9
  },
  {
    id: '10C',
    type: 'C',
    num: 10
  },
  {
    id: 'JC',
    type: 'C',
    num: 11
  },
  {
    id: 'QC',
    type: 'C',
    num: 12
  },
  {
    id: 'KC',
    type: 'C',
    num: 13
  },
  {
    id: 'AC',
    type: 'C',
    num: 14
  },
  {
    id: '2D',
    type: 'D',
    num: 2
  },
  {
    id: '3D',
    type: 'D',
    num: 3
  },
  {
    id: '4D',
    type: 'D',
    num: 4
  },
  {
    id: '5D',
    type: 'D',
    num: 5
  },
  {
    id: '6D',
    type: 'D',
    num: 6
  },
  {
    id: '7D',
    type: 'D',
    num: 7
  },
  {
    id: '8D',
    type: 'D',
    num: 8
  },
  {
    id: '9D',
    type: 'D',
    num: 9
  },
  {
    id: '10D',
    type: 'D',
    num: 10
  },
  {
    id: 'JD',
    type: 'D',
    num: 11
  },
  {
    id: 'QD',
    type: 'D',
    num: 12
  },
  {
    id: 'KD',
    type: 'D',
    num: 13
  },
  {
    id: 'AD',
    type: 'D',
    num: 14
  },
  {
    id: '2S',
    type: 'S',
    num: 2
  },
  {
    id: '3S',
    type: 'S',
    num: 3
  },
  {
    id: '4S',
    type: 'S',
    num: 4
  },
  {
    id: '5S',
    type: 'S',
    num: 5
  },
  {
    id: '6S',
    type: 'S',
    num: 6
  },
  {
    id: '7S',
    type: 'S',
    num: 7
  },
  {
    id: '8S',
    type: 'S',
    num: 8
  },
  {
    id: '9S',
    type: 'S',
    num: 9
  },
  {
    id: '10S',
    type: 'S',
    num: 10
  },
  {
    id: 'JS',
    type: 'S',
    num: 11
  },
  {
    id: 'QS',
    type: 'S',
    num: 12
  },
  {
    id: 'KS',
    type: 'S',
    num: 13
  },
  {
    id: 'AS',
    type: 'S',
    num: 14
  }
]

const suffleCards = (cards)=>{
  var currentIndex = cards.length, temporaryValue, randomIndex;
  while (0 !== currentIndex) {
   randomIndex = Math.floor(Math.random() * currentIndex);
   currentIndex -= 1;
   temporaryValue = cards[currentIndex];
   cards[currentIndex] = cards[randomIndex];
   cards[randomIndex] = temporaryValue;
  }
  return cards;
}

const divideCards = (size)=>{
  let suffled = suffleCards(cards)
  suffled = suffleCards(cards)
  suffled = suffleCards(cards)

  const players = []

  for (var i = 0; i < size; i++) {
    players[i] = []
  }

  let j = 0
  for (var i = 0; i < suffled.length; i++) {
    players[j].push(suffled[i])
    if(j == 3){
      j = 0
    }else {
      j++
    }
  }
  for (var i = 0; i < players.length; i++) {
    players[i].sort()
  }
  return players
}

module.exports = {
  cards,
  suffleCards,
  divideCards
}

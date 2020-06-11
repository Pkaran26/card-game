const cards = [
  {
    id: 'AH'
  },
  {
    id: '2H'
  },
  {
    id: '3H'
  },
  {
    id: '4H'
  },
  {
    id: '5H'
  },
  {
    id: '6H'
  },
  {
    id: '7H'
  },
  {
    id: '8H'
  },
  {
    id: '9H'
  },
  {
    id: '10H'
  },
  {
    id: 'JH'
  },
  {
    id: 'QH'
  },
  {
    id: 'KH'
  },
  {
    id: 'AC'
  },
  {
    id: '2C'
  },
  {
    id: '3C'
  },
  {
    id: '4C'
  },
  {
    id: '5C'
  },
  {
    id: '6C'
  },
  {
    id: '7C'
  },
  {
    id: '8C'
  },
  {
    id: '9C'
  },
  {
    id: '10C'
  },
  {
    id: 'JC'
  },
  {
    id: 'QC'
  },
  {
    id: 'KC'
  },
  {
    id: 'AD'
  },
  {
    id: '2D'
  },
  {
    id: '3D'
  },
  {
    id: '4D'
  },
  {
    id: '5D'
  },
  {
    id: '6D'
  },
  {
    id: '7D'
  },
  {
    id: '8D'
  },
  {
    id: '9D'
  },
  {
    id: '10D'
  },
  {
    id: 'JD'
  },
  {
    id: 'QD'
  },
  {
    id: 'KD'
  },
  {
    id: 'AS'
  },
  {
    id: '2S'
  },
  {
    id: '3S'
  },
  {
    id: '4S'
  },
  {
    id: '5S'
  },
  {
    id: '6S'
  },
  {
    id: '7S'
  },
  {
    id: '8S'
  },
  {
    id: '9S'
  },
  {
    id: '10S'
  },
  {
    id: 'JS'
  },
  {
    id: 'QS'
  },
  {
    id: 'KS'
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

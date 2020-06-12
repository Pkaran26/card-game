class App extends React.Component {
  constructor(){
    super()
    this.state = {
      id: '',
      message: 'initializing',
      loading: true,
      myCards: [],
      currentCards: [],
      token: false
    }
    this.socket = io()
  }
  componentDidMount(){
    this.socket.on('connect', ()=>{
    //  console.log('connected')
      this.setState({
        id: this.socket.id,
        message: 'waiting for other players'
      })
    })

    this.socket.on('START', (data)=>{
    //  console.log(data)
      this.setState({
        message: '',
        loading: false,
        myCards: data
      })
    })

    this.socket.on('TOKEN', (data)=>{
      console.log(data)
      this.setState({
        token: data
      })
    })

    this.socket.on('CURRENT_CARDS', (data)=>{
      this.setState({
        currentCards: data
      })
    })

    this.socket.on('disconnect', ()=>{
  //    console.log('disconnected')
    })
  }

  verifyCard = (card)=>{
    const { currentCards } = this.state
    if(currentCards.length === 0){
      return true
    }
    const result = currentCards.filter((e, i)=>{
      console.log(e.id, card.id);
      return e.id.charAt(1) == card.id.charAt(1) || e.id.charAt(2) == card.id.charAt(2) || e.id.charAt(1) == card.id.charAt(2) || e.id.charAt(2) == card.id.charAt(1)
    })
    return result.length>0? true: false
  }

  dropCard = (e, i)=>{
    const { myCards, token } = this.state
    console.log(token && this.verifyCard(e));
   if(token && this.verifyCard(e)){
      myCards.splice(i, 1)
      this.setState({
        myCards,
        token: false
      })
      this.socket.emit('ON_MOVE', e, myCards)
   }
  }

  render() {
    return (
      <div>
        { this.state.loading? <Loader message={ this.state.message }/>: null }
        { this.state.token? <TokenMessgae />: null }
        <Board currentCards={ this.state.currentCards } />
        <div className="card bg-light">
          <div className="card-body" style={{ display: 'flex', overflow: 'auto' }}>
            { this.state.myCards && this.state.myCards.length>0?
               this.state.myCards.map((e, i)=>(
              <div onClick={ (el)=>{ this.dropCard(e, i) } }>
                <img src={`/cards/${ e.id }.png`} style={{ width: '100px', margin: '5px', cursor: 'pointer' }} />
              </div>
            )) :null}
          </div>
        </div>
      </div>
    )
  }
}

const Board = ({ currentCards })=>(
  <div className="card bg-light">
    <div className="card-body" style={{ display: 'flex' }} style={{ height: '400px' }}>
      { currentCards && currentCards.length>0?
        currentCards.map((e, i)=>(
          <img src={`/cards/${ e.id }.png`} style={{ width: '215px', margin: '15px' }} />
        ))
       : null}
    </div>
  </div>
)

const Loader = ({ message })=>(
  <div className="loader">
    <h1>{ message }</h1>
  </div>
)

const TokenMessgae = ()=>(
  <div class="alert alert-primary tokenPopup">
    <strong>it's your turn</strong>
  </div>
)
ReactDOM.render(<App />, document.getElementById('root'))

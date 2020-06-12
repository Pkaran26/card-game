class App extends React.Component {
  constructor(){
    super()
    this.state = {
      id: '',
      message: 'initializing',
      loading: true,
      myCards: [],
      token: false
    }
    this.socket = io()
  }
  componentDidMount(){
    this.socket.on('connect', ()=>{
      console.log('connected')
      this.setState({
        id: this.socket.id,
        message: 'waiting for other players'
      })
    })

    this.socket.on('START', (data)=>{
      console.log(data)
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

    this.socket.on('disconnect', ()=>{
      console.log('disconnected')
    })
  }

  dropCard = (i)=>{
    const { myCards } = this.state
    myCards.splice(i, 1)
    this.setState({
      myCards
    })
  }

  render() {
    return (
      <div>
        { this.state.loading? <Loader message={ this.state.message }/>: null }
        <TokenMessgae />
        <div className="card bg-light">
          <div className="card-body" style={{ height: '300px' }}>

          </div>
        </div>
        <div className="card bg-light">
          <div className="card-body" style={{ display: 'flex', overflow: 'auto' }}>
            { this.state.myCards && this.state.myCards.map((e, i)=>(
              <div onClick={ (e)=>{ this.dropCard(i) } }>
                <img src={`/cards/${ e.id }.png`} style={{ width: '100px', margin: '5px', cursor: 'pointer' }} />
              </div>
            )) }
          </div>
        </div>
      </div>
    )
  }
}

const Loader = ({ message })=>(
  <div className="loader">
    <h1>{ message }</h1>
  </div>
)

const TokenMessgae = ()=>(
  <div class="alert alert-dismissible alert-primary tokenPopup">
    <button type="button" class="close" data-dismiss="alert">&times;</button>
    <strong>your turn</strong>
  </div>
)
ReactDOM.render(<App />, document.getElementById('root'))

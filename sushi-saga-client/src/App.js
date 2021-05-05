import React, { Component } from 'react';
import SushiContainer from './containers/SushiContainer';
import Table from './containers/Table';

// Endpoint!
const API = "http://localhost:3000/sushis"

class App extends Component {
  state = {
    allSushi: [],
    fourSushi: [],
    startSlice: 0,
    endSlice: 4,
    wallet: 100,
    paidForSushi: []
  }

  componentDidMount() {
    fetch(API)
    .then(resp => resp.json())
    .then((json)=>{
      const updatedSushi = [...json]
      updatedSushi.map(sushi => sushi.eaten = false)
      this.setState({ 
      allSushi: updatedSushi,
      fourSushi: updatedSushi.slice(this.state.startSlice, this.state.endSlice)
    })})
    // below makes it more like a conveyer belt
    // setInterval(this.moreSushi, 3000)
  }

  moreSushi = () => {
    if (this.state.endSlice < 100) {
      this.setState((prevState) => ({
        startSlice: prevState.startSlice + 4,
        endSlice: prevState.endSlice + 4,
      }))
    } else {
      this.setState({
        startSlice: 0,
        endSlice: 4,
      }) 
      }
    this.setState((prevState) => ({fourSushi: prevState.allSushi.slice(prevState.startSlice, prevState.endSlice)}))
  }

  eatSushi = (id, price) => {
    if (!this.state.paidForSushi.includes(id) && this.state.wallet >= price) {
      const updatedSushi = [...this.state.allSushi]
      updatedSushi.map(sushi => {
        if (sushi.id === id) {
          sushi.eaten = true
          return sushi
        } else {
          return sushi
        }
      })
      this.setState((prevState) => ({
        paidForSushi: [...prevState.paidForSushi, id],
        wallet: prevState.wallet - price,
        allSushi: updatedSushi,
        fourSushi: updatedSushi.slice(this.state.startSlice, this.state.endSlice)
      }))
    } else if (this.state.paidForSushi.includes(id)) {
      alert("That's an empty plate!")
    } else if (this.state.wallet <= price) {
      alert("You don't have enough money!")
    }
  }

  render() {
    return (
      <div className="app">
        <SushiContainer 
        fourSushi={this.state.fourSushi} 
        moreSushi={this.moreSushi}
        eatSushi={this.eatSushi}
        />
        <Table wallet={this.state.wallet} paidForSushi={this.state.paidForSushi} />
      </div>
    );
  }
}

export default App;
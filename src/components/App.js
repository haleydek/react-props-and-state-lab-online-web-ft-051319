import React from 'react'

import Filters from './Filters'
import PetBrowser from './PetBrowser'

class App extends React.Component {
  constructor() {
    super()

    this.baseURL = '/api/pets'

    this.state = {
      pets: [],
      filters: {
        type: 'all'
      }
    }

    this.handleFilters = this.handleFilters.bind(this)
    this.getPetsURL = this.getPetsURL.bind(this)
    this.handleFindPets = this.handleFindPets.bind(this)
    this.handleAdoption = this.handleAdoption.bind(this)
  }

  handleFilters(newType){
    this.setState({
      ...this.state, filters: { type: newType }
    })
  }

  getPetsURL(){
    if (this.state.filters.type === "all"){
      return this.baseURL
    } else if (this.state.filters.type === "cat" || "dog" || "micropig"){
      return `${this.baseURL}?type=${this.state.filters.type}`
    } else {
      return false
    }
  }

  handleFindPets(event){

    console.log("filters state: " + this.state.filters)

    if (this.getPetsURL()) {
      fetch(this.getPetsURL())
      .then(res => res.json())
      .then(petsData => this.setState({...this.state, pets: petsData}, () => console.log(this.state)))
    }
  }

  handleAdoption(petId){
    let petsArray = this.state.pets.map(pet => {
      return pet.id === petId ? {...pet, isAdopted: true} : pet;
    })
    
    this.setState({pets: [...petsArray]}, () => console.log("pets state: " + this.state.pets))
  }

  render() {
    return (
      <div className="ui container">
        <header>
          <h1 className="ui dividing header">React Animal Shelter</h1>
        </header>
        <div className="ui container">
          <div className="ui grid">
            <div className="four wide column">
              <Filters onChangeType={this.handleFilters} onFindPetsClick={this.handleFindPets} />
            </div>
            <div className="twelve wide column">
              <PetBrowser pets={this.state.pets} onAdoptPet={this.handleAdoption} />
            </div>
          </div>
        </div>
      </div>
    )
  }
}

export default App

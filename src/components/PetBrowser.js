import React from 'react'

import Pet from './Pet'

class PetBrowser extends React.Component {
  printPetComponents(){
    return this.props.pets.map(pet => <Pet pet={pet} onAdoptPet={this.props.onAdoptPet} isAdopted={pet.isAdopted} />)
  }

  render() {
    return <div className="ui cards">{this.printPetComponents()}</div>
  }
}

export default PetBrowser

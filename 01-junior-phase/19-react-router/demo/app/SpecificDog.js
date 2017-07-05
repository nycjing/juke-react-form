import React from 'react';
// import axios from 'axios'

export default class SpecificDog extends React.Component {

  componentDidMount () {
    // axios.get(`/api/dogs/${this.props.match.params.puppyName}`)
    //   .then(res => res.data)
    //   .then(puppy => {
    //   })
  }

  render () {
    console.log(this.props)

    return (
      <div>
        This is the page for: {this.props.match.params.puppyName}

        ...but my favorite dog is: {this.props.favoriteDog}
      </div>
    )
  }
}

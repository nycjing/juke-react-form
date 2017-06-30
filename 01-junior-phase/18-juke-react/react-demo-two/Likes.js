import React from 'react';
import LikesView from './LikesView';
/*
 *
 * Remember that when you have DOM elements...
 *
 * var el = document.getElementById('foo')
 * el.className = 'bar'
 *
 * You use the camel-cased properties
*/

class Likes extends React.Component {

  constructor () {
    super();
    this.state = {
      likes: 0
    };

    this.handleClick = this.handleClick.bind(this);
  }

  handleClick () {
    console.log('I am clicked')
    this.setState({
      likes: this.state.likes + 1
    });

    // this.setState(function (oldState) {
    //   return {
    //
    //   } // newState
    //
    // }, function cb2 () {})
  }

  render () {
    return <LikesView likes={this.state.likes} handleClick={this.handleClick} />
  }
}

export default Likes;

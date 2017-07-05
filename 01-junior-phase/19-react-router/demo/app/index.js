// Wow! This is something you can do with webpack!
// As long as we have the style-loader plugin (and a few other tools),
// we can import scss and webpack will build it out into css!
// Don't worry too much about how this happens for now - but you can feel
// free to write any scss you want now!
import './index.scss';

import React from 'react';
import ReactDOM from 'react-dom';
import { HashRouter as Router, Route, Link } from 'react-router-dom';
import SpecificDog from './SpecificDog'
import Dog from './Dog'


const Cat = () => {
  return (
    <div className="red-box">
      <h1>Cat</h1>
      <Route path="/cat/kitten" component={Kitten} />
    </div>
  )
}

const Kitten = () => {
  return (
    <h3 className="green-box">Kitten</h3>
  )
}

const Main = () => {

  const favoriteDog = 'cody'

  return (
    <div>
      Hello!
      <ul>
        <li>
          <Link to="/dog">Go to Dog</Link>
        </li>
        <li>
          <Link to="/cat">Go to Cat</Link>
        </li>
    </ul>
    <Route exact path="/" component={Cat} />
    <Route exact path="/dog" component={Dog} />
    <Route path="/cat" component={Cat} />
    <Route path="/dog/:puppyName" render={
      (routeProps) => <SpecificDog {...routeProps} favoriteDog={favoriteDog} />
    } />
  </div>
  )

}

ReactDOM.render(
  <Router>
    <Main />
  </Router>,
  document.getElementById('app')
)


// Object spread operator

// const obj1 = {
//   a: 1
// }
//
// const obj2 = {
//   b: 2,
//   ...obj1
// }





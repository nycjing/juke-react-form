import React from 'react';
import NewsFeed from './NewsFeed';
import Likes from './Likes';

class MyComponent extends React.Component {

  render () {
    return (
      <div>
        <NewsFeed />
        <Likes />
      </div>
    );
  }
}

export default MyComponent;

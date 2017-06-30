import React from 'react';

const newsFeedArr = [
  'You won\'t believe this thing',
  'Ten things you are doing wrong',
  'Check out my stuff'
];

class NewsFeed extends React.Component {

  constructor (props) {
    super(props);
    this.state = {
      newsFeedArr: []
    };
  }

  componentDidMount () {
    console.log('component did mount')
    Promise.resolve()
      .then(() => {
        this.setState({
          newsFeedArr: newsFeedArr
        });
      });



  }

  render () {
    console.log('rendering news feed')
    return (
      <div>
        <h3>News Feed</h3>
        <ul>
          {
            this.state.newsFeedArr.map((newsStory, idx) => {
              return <li>{ newsStory }</li>
            })
          }
        </ul>
      </div>
    );
  }
}

export default NewsFeed;

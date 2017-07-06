import React from 'react';
import NewsFeed from './NewsFeed';


const newsFeedArr = [
  'You won\'t believe this thing',
  'Ten things you are doing wrong',
  'Check out my stuff'
];



class Main extends React.Component {

  constructor (props) {
    super(props);
    this.state = {
      newsFeedArr: []
    };

    this.addToNewsFeed = this.addToNewsFeed.bind(this)
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

  addToNewsFeed(text){
  	this.setState((prevState) => {
  		return {newsFeedArr: prevState.newsFeedArr.concat(text)}
  	})
  }


  render () {
    return (
      <div>
        <NewsFeed addToNewsFeed={this.addToNewsFeed} newsFeedArr={this.state.newsFeedArr}/>
      </div>
    );
  }
}

export default Main;

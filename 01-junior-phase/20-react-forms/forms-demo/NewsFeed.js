import React from 'react';
import WriteStoryContainer from './WriteStoryContainer'

function NewsFeed(props){

    const stories = props.newsFeedArr
    console.log(props.addToNewsFeed)

    return (
      <div>
        <h3>News Feed</h3>
        <ul>
          {
            stories.map((story, idx) => {
              return <li key={idx}>{ story }</li>
            })
          }
        </ul>
        {/* write story here */}
        <WriteStoryContainer addToNewsFeed={props.addToNewsFeed}/>
        {/* write story here */}
      </div>
    );

}

export default NewsFeed;

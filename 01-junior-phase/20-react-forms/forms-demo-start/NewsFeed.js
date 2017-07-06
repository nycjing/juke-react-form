import React from 'react';
import WriteStory from './WriteStory'

function NewsFeed(props){

    const stories = props.newsFeedArr

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
        <WriteStory />
        {/* write story here */}
      </div>
    );

}

export default NewsFeed;

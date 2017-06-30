import React from 'react';

function LikesView(props) {

  return (
    <div>
      <h3>Likes: {props.likes}</h3>
      <button className="btn btn-primary" onClick={props.handleClick}>Like</button>
    </div>
  );
  
}

export default LikesView;

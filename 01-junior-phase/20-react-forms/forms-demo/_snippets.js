before starting = change button in form to type='submit'
// uncomment WriteStory component

// Show it does nothing except refreshes page

// If we think about the state of this form - what is it? What does this form need to keep track of?

// Now where should this state live? i.e. which component?

// We could keep all state in the form itself. yeah, that’s a good idea. 
// As we type in our story, what needs to re-render? 
// Nothing really, we can keep all our state in the form itself. 

// INSERT CONSTRUCTOR INTO 

constructor() {
	super()
	this.state = {
		text: ''
	}
}


// What are the problems with this?

// our presentational component is now tightly coupled to state. 
// We ideally want to split up stateful components and presentational components, 
// so that we can re-use components more easily. 

// Stateful components are often called 'containers'
// So I'm going to make a stateful container

// MAKE WRITESTORYCONTAINER (and remove state from WriteStory)
import React, { Component } from 'react';
import WriteStory from './WriteStory'

export default class WriteStoryContainer extends Component {
	constructor(){
		this.state = {
			text: ''
		}
	}

	render() {
		return (
			<div>
				<WriteStory />
			</div>
		);
	}
}

Now lets make newsFeed imports and show WriteStoryContainer instead of just WriteStory

Lets make sure everything still works. Nothing has changed except weve made everything more complicated

Now lets actually get this form to do something:
First up, we need to get data from the input field

- set up handleChange in the container that console.logs the event
- pass this handle change down as props
- onChange, run {this.props.handleChange}

The event object is a synthetic. It is the same object in memory for all events triggered.
We have to use it right now. We can't wait. 

- grab event.target.value from the event and console.log it

// *********
Ok, so we have state being managed locally down here on our form
when we click submit, we need this local state to be transmitted up to 
whichever component handles the state for newsFeedArr


We need a way to change state in main.js
addToNewsFeed in main.js

```
this.setState({
	newsFeed: this.state.newsFeed.concat({text: text, id: this.state.newsFeed.length+1})
})
```
OR
```
  addToNewsFeed(text){
  	this.setState((prevState) => {
  		return {newsFeedArr: prevState.newsFeedArr.concat(text)}
  	})
  }
```
```
THEN BIND IT
Then pass down to newsFeed
then pass down again to WriteStoryContainer

Now in the container, we want to run this 'addToNewsFeed' function whenever the form submits

so we will have a handleSubmit function in the container, which invokes this function
REMBER TO BIND THIS!
```
	handleSubmit(){
		this.props.addToNewsFeed(this.state.text)
	}

```

And when should handleSubmit be called?
when the button is pressed! So lets pass this handleSubmit function down as props

and then call it when we click submit

// TRICKED! we need to event.preventDefault to stop page refresh


// 
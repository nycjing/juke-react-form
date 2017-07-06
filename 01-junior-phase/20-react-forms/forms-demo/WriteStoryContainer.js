import React, { Component } from 'react';
import WriteStory from './WriteStory'

export default class WriteStoryContainer extends Component {
	constructor(){
		super()
		this.state = {
			text: ''
		}

		this.handleChange = this.handleChange.bind(this)
		this.handleSubmit = this.handleSubmit.bind(this)
	}

	handleChange(event){
		this.setState({
			text: event.target.value
		})
	}

	handleSubmit(event){
		event.preventDefault()
		this.props.addToNewsFeed(this.state.text)
	}

	render() {
		return (
			<div>
				<WriteStory handleChange={ this.handleChange } handleSubmit={this.handleSubmit}/>
			</div>
		);
	}
}

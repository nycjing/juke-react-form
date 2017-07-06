import React from 'react'

export default class WriteStory extends React.Component {
	render() {
		return (
			<form onSubmit={this.props.handleSubmit}>
				<div className='form-group'>
					<label htmlFor="story">Your Story</label>
					<input onChange={this.props.handleChange} className='form-control' type="text" name='story' placeholder='enter new stuff'/>
				</div>
				<div className='form-group'>
					<button type="submit" className="btn btn-primary">Submit</button>
				</div>
			</form>
		);
	}
}


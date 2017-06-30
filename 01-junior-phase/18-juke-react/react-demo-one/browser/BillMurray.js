import React from 'react'


export class BillMurray extends React.Component {

	constructor() {
		super()
		this.state = {
			size: 30
		}

		this.handleClick = this.handleClick.bind(this)
	}

	componentWillMount() {
		console.log('about to go on stage')
	}

	componentDidMount() {
		console.log("I'm on the big screen!")
	}

	handleClick() {
		this.setState({
			size: this.state.size * 2
		})
	}

	render(){
		const url = `http://fillmurray.com/${this.state.size}/${this.state.size}`

		return <div>
			<button onClick={ this.handleClick }>clickMe</button>
			<img src={url} />

		</div>

		
	}
}
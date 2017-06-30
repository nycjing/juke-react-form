import React from 'react'
import ReactDOM from 'react-DOM'

import { BillMurray } from './BillMurray'
import { WelcomeCohort } from './WelcomeCohort'




ReactDOM.render(
	<div>
		<WelcomeCohort name="1706" course="FSA" other="remote"/>
		<BillMurray/>
	</div>, 
	document.getElementById('main')
)


// Two ways of making components
	// 1) 'dumb'/functional/stateless components. We pass in data and access it via 'props'
	// 2) 'smart'/class/stateful components. We pass in data and access it via 'this.props'

// Functional components just take in props, and spit out a part of the UI.
// Class components CAN take in props, but they can also store their own state.

import React from 'react'
// We can make react elements like this:
export function WelcomeCohort(props){
	console.log(props)
	return <h1>WELCOME {props.course}-{props.name}-{props.other}</h1>
}
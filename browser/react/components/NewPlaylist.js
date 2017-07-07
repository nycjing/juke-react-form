import React from 'react';


export default class NewPlaylist extends React.Component {
    constructor() {
        super()
        this.state = {
            playlistName: ''
        }

        this.handleChange = this.handleChange.bind(this)
        this.handleSubmit = this.handleSubmit.bind(this)
    }

    handleChange(event) {
        this.setState({
            playlistName: event.target.value
        })
        console.log(event.target.value)
    }

    handleSubmit(event) {
        event.preventDefault()
         this.addNewFeed(this.state.playlistName)
    }

    addNewFeed(text){
        console.log('New feed', text)
        this.setState({
            playlistName: ''
        })
    }

    render() {

        return (

            <div className="well">
                <form className="form-horizontal" onSubmit={this.handleSubmit}>
                    <fieldset>
                        <legend>New Playlist</legend>
                        <div className="form-group">
                            <label className="col-xs-2 control-label">Name</label>
                            <div className="col-xs-10">
                                <input onChange={this.handleChange} value={this.state.playlistName}  className="form-control" type="text"/>
                            </div>
                        </div>
                        <div className="form-group">
                            <div className="col-xs-10 col-xs-offset-2">
                                <button type="submit" className="btn btn-success">Create Playlist</button>
                            </div>
                        </div>
                    </fieldset>
                </form>
            </div>
        )
    };
}

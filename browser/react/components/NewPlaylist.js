import React from 'react';
import axios from 'axios';

export default class NewPlaylist extends React.Component {
    constructor() {
        super()
        this.state = {
            playlistName: '',
            fired: false
        }

        this.handleChange = this.handleChange.bind(this)
        this.handleSubmit = this.handleSubmit.bind(this)
    }

    handleChange(event) {
        this.setState({
            playlistName: event.target.value,
            fired: true
        })
        console.log(event.target.value)
    }

    handleSubmit (evt) {
        evt.preventDefault(); // prevent the page from refreshing
        this.props.addPlaylist(this.state.playlistName); // pass the input value to the method from Main!
        this.setState({playlistName: ''}); // reset the input value to be empty
    }


    render() {
    console.log(!this.state.fired)
        return (


            <div className="well">
                <form className="form-horizontal" onSubmit={this.handleSubmit}>
                    <fieldset>
                        <legend>New Playlist</legend>
                        {this.state.fired && !this.state.playlistName.length || this.state.playlistName.length>16 ?
                              <div className="alert alert-warning">Please enter a valid playlist name</div>:null}
                        <div className="form-group">
                            <label className="col-xs-2 control-label">Name</label>
                            <div className="col-xs-10">
                                <input onChange={this.handleChange} value={this.state.playlistName}
                                       className="form-control" type="text"/>
                            </div>
                        </div>
                        <div className="form-group">
                            <div className="col-xs-10 col-xs-offset-2">
                                <button disabled={this.state.playlistName.length>16 || !this.state.playlistName}
                                        type="submit" className="btn btn-success">Create Playlist</button>
                            </div>
                        </div>
                    </fieldset>
                </form>
            </div>
        )
    };
}

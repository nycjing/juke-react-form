import React, {Component} from 'react';
import {Link} from 'react-router-dom';
import axios from 'axios';

export default class AllArtists extends Component {

    constructor() {
        super();
        this.state = {
            artists: [],
            inputArtist: ''
        };
        this.handleChange = this.handleChange.bind(this)
    }

    componentDidMount() {
        axios.get('/api/artists')
            .then(res => res.data)
            .then(artists => this.setState({artists}));
    }

    handleChange(event) {
        this.setState({
            inputArtist: event.target.value
        })
    }

    render() {

        console.log(this.state.artists);
        let artists = this.state.artists;
        if (this.state.inputArtist.length > 0) {
            const artistSelect = this.state.artists.filter(artist => {
                return artist.name === this.state.inputArtist
            });

            console.log(artistSelect);
            artists = artistSelect
        }

        return (
            <div>
                <div>
                    <form className="form-group" style={{marginTop: '20px'}}>
                        <input onChange={this.handleChange}
                               className="form-control"
                               placeholder="Enter artist name"
                        />
                    </form>
                </div>
                <div>
                    <h3>Artists</h3>
                    <div className="list-group">
                        {
                            artists.map(artist => {
                                return (
                                    <div className="list-group-item" key={artist.id}>
                                        <Link to={`/artists/${artist.id}`}>{ artist.name }</Link>
                                    </div>
                                );
                            })
                        }
                    </div>
                </div>
            </div>
        );
    }
}

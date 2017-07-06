import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';

export default class AllArtists extends Component {

  constructor () {
    super();
    this.state = {
      artists: [],
      inputArtist: ''
    };
      this.handleChange = this.handleChange.bind(this)
  }

  componentDidMount () {
    axios.get('/api/artists')
      .then(res => res.data)
      .then(artists => this.setState({ artists }));
  }

    handleChange(event){
        this.setState({
            inputArtist : event.target.value
        })
    }
  render () {

     console.log(this.state.artists[0]);

    const artists = this.state.artists.filter(artist=>{
              return artist.name === this.state.inputArtist
        });

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

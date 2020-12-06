import React from 'react';
//import {uid} from 'react-uid';
import {
    DescriptionWrapper,
    Wrapper,
    ListWrapper,
    NavItem,
    Navbar,
    Container
  } from './styled';
import axios from 'axios';
import CoverArt from './CoverArt.js';
import keys from '../../keys.js';


export default class Recommend extends React.Component {

    state = {
        clientID: keys.clientID,
        clientSecret: keys.clientSecret,
        access_token: "",
        genres: [],
        data: {},
        genresInput: "",
        seed_artists: "4NHQUGzhtTLFvgF5SZesLK",
        seed_tracks: "0c6xIDDpzE81m2q797ordA",
        tracks: [],
        albums: []
    }
    
    componentDidMount() {
        this.getToken();
    }
    
    getToken = async () => {
        const result = await fetch('https://accounts.spotify.com/api/token', 
        {
            method: 'POST',
            headers: {
                'Content-Type': 'application/x-www-form-urlencoded',
                'Authorization' : `Basic ` + btoa(this.state.clientID + ':' + this.state.clientSecret)

            },
            body: 'grant_type=client_credentials'
        });
        const data = await result.json();
        this.state.access_token = data.access_token;
        this.state.data = data;
    }
    
    getGenres = async () => {
        axios.get(`https://api.spotify.com/v1/recommendations/available-genre-seeds`, 
        {
            headers: {
            Authorization: `Bearer ${this.state.access_token}`
        }})
        .then ((data) => {
            this.setState({
                genres: data.data["genres"]
            })
            console.log(this.state.genres);
        })
    }
    
    onChangeHandler = (e) => {
        const inputGenres = e.target.value.split(' ').join('%20').split(',').join('%2C');
        this.setState({
            genresInput: inputGenres
        })
    }

    getRecommendationsHandler = async () => {
        axios.get(`https://api.spotify.com/v1/recommendations?seed_artists=4NHQUGzhtTLFvgF5SZesLK&seed_genres=${this.state.genresInput}&seed_tracks=0c6xIDDpzE81m2q797ordA&min_energy=0.4&min_popularity=50`,  
        {
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${this.state.access_token}`,
            }
        })
        .then(data => {
            this.setState({
                tracks: data.data.tracks
            })
            console.log(this.state.tracks)
            var newAlbum = [];
            this.state.tracks.forEach(track => {
                var temp = {};
                temp["id"] = track["album"]["id"];
                temp["total_tracks"] = track["album"]["total_tracks"];
                temp["name"] = track["album"]["name"];
                temp["image"] = track["album"]["images"][1]["url"];
                temp["artist_name"] = track["artists"][0]["name"];
                newAlbum.push(temp);
            })
            this.setState({
                albums: newAlbum
            })
        })
        .catch(err => {
            console.log(err);
        })
    }

    keyPressHandler = (e) => {
        if (e.key !== 'Enter') {
            return;
        }
        this.getRecommendationsHandler();
    }
    
    gridTemplateColumns = w => {
        switch (true) {
          case w <= 547:
            return 'repeat(2, minmax(16px, 218px))';
          case w >= 548 && w <= 771:
            return 'repeat(3, minmax(146px, 230px))';
          case w >= 772 && w <= 979:
            return 'repeat(4, minmax(166px, 217px))';
          default:
            return 'repeat(6, minmax(145px, 230px))';
        }
    }

    render() {
        return (
            <React.Fragment>
                <Container>
                    <Navbar>
                        <ListWrapper>
                            <NavItem to="/browse/featured">FEATURED</NavItem>
                            <NavItem to="/browse/newreleases">NEW RELEASES</NavItem>
                            <NavItem to="/search">SEARCH</NavItem>
                            <NavItem to="/recommend">RECOMMENDATIONS</NavItem>
                        </ListWrapper>
                    </Navbar>
                    <Wrapper>
                        <br/>
                        <div role = "search">
                        <input 
                            ref={input => input && input.focus()}
                            placeholder = "Pop, Country, Metal, etc."
                            className = "search-bar" 
                            type="text" 
                            onChange = {(e) => this.onChangeHandler(e)}
                            onKeyPress = {(e) => this.keyPressHandler(e)}
                            />
                        </div>
                        <br/>
                    </Wrapper>
                    <DescriptionWrapper>
                    {
                        this.state.albums.length ? 
                        <Wrapper template={this.gridTemplateColumns(100)}>
                            {
                                this.state.albums.map((album, index) => {
                                    return <CoverArt 
                                        key = {`recommend ${
                                            index
                                        }`}
                                        //key = {uid(index)}
                                        playBtn = {false} 
                                        bigTitle = {true} 
                                        temp = {album} 
                                    />
                                })
                            }
                        </Wrapper> 
                        : null
                    }
                    </DescriptionWrapper>
                </Container>
            </React.Fragment>
        )
    }
}
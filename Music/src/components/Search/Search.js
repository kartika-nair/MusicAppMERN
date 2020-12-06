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
import './Search.css';
import keys from '../../keys.js';

export default class Search extends React.Component {

    state = {
        clienID: keys.clientID,
        clientSecret: keys.clientSecret,
        access_token: "",
        searchField: "",
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
                'Authorization' : `Basic ` + btoa(this.state.clienID + ':' + this.state.clientSecret)

            },
            body: 'grant_type=client_credentials'
        });
        const data = await result.json();
        this.state.access_token = data.access_token;
        this.state.data = data;
    }
    


    onChangeHandler = (e) => {
        const newSearchField = e.target.value.split(' ').join('%20OR%20');
        this.setState({
            searchField: newSearchField
        })
    }

    searchHandler = () => {
        axios.get(`https://api.spotify.com/v1/search?q=${this.state.searchField}&type=album`, 
        {
            headers: {
            Authorization: `Bearer ${this.state.access_token}`
        }})
        .then(data => {
            var responseData = data.data.albums.items;
            var newAlbum = [];
            responseData.forEach(element => {
                let temp = {};
                temp["id"] = element["id"];
                temp["total_tracks"] = element["total_tracks"];
                temp["name"] = element["name"];
                temp["image"] = element["images"][1]["url"];
                temp["artist_name"] = element["artists"][0]["name"];
                newAlbum.push(temp);
            });
            this.setState({
                albums: newAlbum
            })
        })
        .catch(err => {
            console.log(err);
        })
    
    }
    onKeyUpHandler() {
        if (this.state.searchField.length === 0)
            return;
        this.searchHandler();
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

                            {/* <NavItem to="/browse/discover">DISCOVER</NavItem> */}
                        </ListWrapper>
                    </Navbar>
                    <Wrapper>
                        <br/>
                        <div role = "search">
                        <input 
                            ref={input => input && input.focus()}
                            placeholder = "Search for an album"
                            className = "search-bar" 
                            type="text" 
                            onKeyUp = {() => this.onKeyUpHandler()}
                            onChange = {(e) => this.onChangeHandler(e)}/>
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
                                        key = {`search ${
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
        );
    }
}
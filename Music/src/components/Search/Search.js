import React from 'react';
import {
    DescriptionWrapper,
    Wrapper,
    Header,
    ListWrapper,
    NavItem,
    Navbar,
    Container
  } from './styled';
import axios from 'axios';
import CoverArt from './CoverArt.js';
import './Search.css';

export default class Search extends React.Component {

    state = {
        searchField: "",
        albums: [],
    }

    onChangeHandler = (e) => {
        this.setState({
            searchField: e.target.value
        })
    }

    searchHandler = () => {
        axios.get(`https://cors-anywhere.herokuapp.com/https://elegant-croissant.glitch.me/spotify?query=${this.state.searchField}&type=album`)
    .then ((data) => {
            //console.log(data.data.albums.items);
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
    }
    componentDidUpdate() {
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
                            onChange = {(e) => this.onChangeHandler(e)}/>
                        </div>
                        <br/>
                    </Wrapper>
                    <DescriptionWrapper>
                    {
                        this.state.albums.length ? 
                        <Wrapper template={this.gridTemplateColumns(100)}>
                            {
                                this.state.albums.map(album => {
                                    return <CoverArt 
                                        key = {album.id}
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
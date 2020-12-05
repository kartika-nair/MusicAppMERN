import React, { Component } from 'react';
import { Route } from 'react-router-dom';

import config from '../../config';

import PlaylistSelectorView from '../../components/PlaylistSelectorView';
import Search from '../../components/Search/Search';
import Recommend from '../../components/Recommend/Recommend';
import { Container, ListWrapper, Navbar, NavItem } from './styled';

class MainContainer extends Component {
  render() {
    return (
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
        <Route
          path="/browse/featured"
          render={routeProps => (
            <PlaylistSelectorView
              windowWidth={this.props.windowWidth}
              {...routeProps}
              config={config.featured}
            />
          )}
        />
        <Route
          path="/browse/newreleases"
          render={routeProps => (
            <PlaylistSelectorView
              windowWidth={this.props.windowWidth}
              {...routeProps}
              config={config.albums}
            />
          )}
        />
        <Route
          path="/search"
          render={() => <Search/>}
        />
        <Route
          path="/recommend"
          render={() => <Recommend/>}
        />
      </Container>
    );
  }
}

export default MainContainer;

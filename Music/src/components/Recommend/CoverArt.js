import React from 'react';

import PlayButton from './PlayButton';
import { Card, Clipart, ClipartWrapper, Title, Wrapper } from './styled';

class CoverArt extends React.Component {
  state = {
    hover: this.props.showPlayBtn,
    showPlay: true,
    showPlayBtn: this.props.showPlayBtn,
    shrink: false,
  };

  UNSAFE_componentWillReceiveProps(nextProps) {
    if (this.state.showPlayBtn !== nextProps.showPlayBtn) {
      this.setState(s => ({
        hover: nextProps.showPlayBtn,
        showPlayBtn: nextProps.showPlayBtn,
      }));
    }
  }

  handleMouseOver = () => {
    this.setState(() => ({ hover: true }));
  };

  handleMouseLeave = () => {
    this.setState(s => ({ hover: false || s.showPlayBtn }));
  };

  handleMouseDown = () => {
    this.setState(() => ({ shrink: true }));
  };

  handleMouseUp = () => {
    this.setState(() => ({ shrink: false }));
  };

  render() {
    const { showPlayBtn, shrink, hover } = this.state;
    const link = `http://localhost:4000/albums/${this.props.temp.id}`;
    return (
      <Wrapper>
        <a href= {link}>
        <Card
          onMouseOver={this.handleMouseOver}
          onMouseLeave={this.handleMouseLeave}
        >
          <ClipartWrapper
            shrink={shrink}
            onMouseDown={this.handleMouseDown}
            onMouseUp={this.handleMouseUp}
          >
            <Clipart hover={hover} icon={this.props.temp.image} />
            {this.props.playBtn &&
              (hover || showPlayBtn) && (
                <PlayButton dataName="play" showPlay={!showPlayBtn} />
              )}
          </ClipartWrapper>
          <div style = {{
            display: 'inline-block',
          }}>
            <Title bigTitle={this.props.bigTitle}>{this.props.temp.name}</Title>
          </div>
          <br/>
          <Title bigTitle={!this.props.bigTitle}>Artist: {this.props.temp.artist_name}</Title>
          <Title bigTitle={!this.props.bigTitle}>Tracks: {this.props.temp.total_tracks}</Title>
        </Card>
        </a>
      </Wrapper>
    );
  }
}

export default CoverArt;

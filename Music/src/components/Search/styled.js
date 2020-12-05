import styled, { css } from 'styled-components';
import { NavLink } from 'react-router-dom';

import { spotifyGray, spotifyGreen } from '../../css-variables/colors';

const activeClassName = 'selected';

export const Card = styled.div`
  cursor: pointer;
  margin-bottom: 35px;
  position: relative;
`;

export const Clipart = styled.div`
  backface-visibility: hidden;
  background-image: url('${props => props.icon}');
  background-size: cover;
  filter: brightness(1);
  height: 0;
  padding-bottom: 100%;
  transition: all 1s ease;
  transition: filter 0.3s cubic-bezier(0.3, 0, 0, 1);
  width: 100%;

  ${props =>
    props.hover &&
    css`
      filter: brightness(0.3);
    `};
`;

export const ClipartWrapper = styled.div`
  box-shadow: ${p => (p.shrink ? '0 0 0' : '0 0 10px rgba(0, 0, 0, 0.3)')};
  transform: scale(${p => (p.shrink ? 0.95 : 1)});
  transition: transform 0.1s ease;
`;

export const Title = styled.p`
  color: #fff;
  display: block;
  font-size: ${p => (p.bigTitle ? '26px' : '18px')};
  font-weight: ${p => (p.bigTitle ? 600 : 400)};
  height: ${p => (p.bigTitle ? '30px' : '10px')};
  margin: 12px 0 4px;
  text-align: center;
`;

export const Wrapper = styled.div`
  padding: 0 8px;
  max-width: 320px;
  width: 100%;
`;


export const DescriptionWrapper = styled.div`
  align-items: center;
  justify-content: flex-start;
  display: flex;
  flex-direction: column;
  flex: 1;
  padding: 0 8px;
  position: relative;
  text-align: center;
  top: 40px;

  @media (max-width: 1199px) {
    top: 0;
    display: flex;
    flex-direction: row;
    justify-content: flex-start;
    align-items: stretch;
    max-width: 100%;
    width: 100%;
    max-height: 255px;
  }

  @media (min-width: 1200px) and (min-width: 1499px) {
  }
`;

export const ListWrapper = styled.ul`
  font-weight: bold;
  list-style: none;
  display: flex;
  flex-direction: row;
  justify-content: center;
  width: 100%;
  align-items: center;

  & li {
    margin: 10px;
    margin-top: 0;
    padding: 10px;
    padding-top: 0;
  }
`;

export const Navbar = styled.nav`
  align-items: center;
  display: flex;
  flex-direction: column;
  height: 86px;
  justify-content: center;
  min-width: 515px;
  padding: 20px 0;
`;

export const NavItem = styled(NavLink).attrs({
  activeClassName,
})`
  color: ${spotifyGray};
  margin: 10px;
  padding: 10px;
  padding-bottom: 0;
  transition-duration: 0.2s;
  transition-property: color;

  &.${activeClassName} {
    color: white;
    position: relative;

    &::after {
      content: '';
      position: absolute;
      left: 35%;
      bottom: -5px;
      height: 1px;
      width: 20px;
      padding-bottom: 5px;
      border-bottom: 2px solid ${spotifyGreen};
    }
  }
`;

export const Container = styled.div`
  font-size: 12.8px;
  font-weight: bold;
  letter-spacing: 1px;
  margin: auto;
  padding: 0 28px;
  width: 100%;
`;
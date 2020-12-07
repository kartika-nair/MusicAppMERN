import styled from 'styled-components';

import { sidebarWidth, playerHeight } from '../../css-variables/layout';

export const Background = styled.div`
  background-color: #36096d;
  background-image: linear-gradient(315deg, #36096d 0%, #37d5d6 74%);
  background-size: cover;
  background-repeat: no-repeat;
  height: 100vh;
  width: 100vw;
  position: fixed;
  z-index: -1;
`;

export const Section = styled.div`
  margin-left: ${sidebarWidth};
  margin-bottom: ${playerHeight};
`;

export const Wrapper = styled.div`
  width: 100%;
`;

import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Link } from 'react-router-dom';
import styled from 'styled-components';

import { StyledBookTitle, StyledPanel, CONTAINER_PADDING } from '../styles';
import mobileCloseImg from '../images/mobile-close.png';
import mobileHamburgerImg from '../images/mobile-hamburger.png';
import { SET_MOBILE_MENU_OPEN } from '../constants';

export default function MobileHeader() {
  const mobileMenuOpen = useSelector((state) => state.mobileMenuOpen);
  const {
    backgroundImageUrl,
    coverTitle,
  } = useSelector((state) => state.config);

  const dispatch = useDispatch();
  const toggleMobileMenuOpen = (event) => {
    event.stopPropagation();
    dispatch({
      type: SET_MOBILE_MENU_OPEN,
      mobileMenuOpen: !mobileMenuOpen,
    });
  };

  return (
    <StyledMobileHeader
      backgroundImageUrl={backgroundImageUrl}
    >
      <StyledTitlePanel as={Link} to="/">
        <StyledBookTitle>{coverTitle}</StyledBookTitle>
      </StyledTitlePanel>
      <StyledMenuTrigger menuOpen={mobileMenuOpen} onClick={toggleMobileMenuOpen} />
    </StyledMobileHeader>
  );
}

const StyledMobileHeader = styled.div`
  ${CONTAINER_PADDING}
  height: 6em;
  background-image: url(${(props) => props.backgroundImageUrl});
  background-size: cover;
  background-position: center;
  box-shadow: 0 0 24px rgba(0, 0, 0, 0.25);
  display: flex;
  align-items: center;
  justify-content: space-between;
  z-index: 1;
`;

const StyledTitlePanel = styled(StyledPanel)`
  height: 3em;
  padding: 0 1em;
  display: flex;
  align-items: center;

  ${StyledBookTitle} {
    position: relative;
    top: 0.1em;
  }
`;

const StyledMenuTrigger = styled(StyledPanel)`
  width: 3em;
  height: 3em;
  background-image: url(${({ menuOpen }) => (menuOpen ? mobileCloseImg : mobileHamburgerImg)});
  background-repeat: no-repeat;
  background-size: auto 1.2em;
  background-position: center;
  cursor: pointer;
`;

import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import styled from 'styled-components';

import { SET_EXPLORER_URL } from '../constants';
import { DURATIONS } from '../styles';

export default function Explorer() {
  const explorerOpen = useSelector((state) => state.explorerOpen);
  const explorerUrl = useSelector((state) => state.explorerUrl);
  const dispatch = useDispatch();

  const setExplorerUrl = (url) => dispatch({ type: SET_EXPLORER_URL, explorerUrl: url });

  return (
    <StyledExplorer explorerOpen={explorerOpen}>
      <StyledExplorerInner>
        <div>{ explorerOpen ? 'open' : 'closed' }</div>
        <div>{ explorerUrl }</div>
        <button type="button" onClick={() => setExplorerUrl('/#/entries/114')}>Set URL to /#/entries/114</button>
      </StyledExplorerInner>
    </StyledExplorer>
  );
}

const StyledExplorer = styled.div`
  width: 100%;
  height: ${({ explorerOpen }) => (explorerOpen ? '50%' : '0%')};
  background-color: #fdf;
  transition: height ${DURATIONS.slide}ms;
  overflow: hidden;
`;

const StyledExplorerInner = styled.div`
  height: 50%;
`;

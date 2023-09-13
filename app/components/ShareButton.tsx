'use client'

import React from 'react'
import {styled} from 'styled-components'
import {COLORS, DEVICES} from '../constants'
import {IoMdShare} from 'react-icons/io'

const ShareButton = () => {
  return (
    <Wrapper>
      <StyledButton>
        <IoMdShare size={30} />
      </StyledButton>
    </Wrapper>
  )
}

export default ShareButton

const Wrapper = styled.div`
  position: absolute;
  top: 4px;
  right: 80px;
  z-index: 1;
  cursor: pointer;
  transition: all 0.2s linear;

  &:hover {
    opacity: 0.7;
  }

  @media ${DEVICES.tablet} {
    right: 48px;
  }
`

const StyledButton = styled.div`
  position: absolute;
  top: 0;
  right: 0;
  color: ${COLORS.text};
  padding: 8px 12px;
  border-radius: 8px;

  &:active {
    transform: scale(0.9);
    transition: transform 0.1s linear;
  }
`

'use client'

import React from 'react'
import {SafeUser} from '../types'
import {AiFillHeart, AiOutlineHeart} from 'react-icons/ai'
import {styled} from 'styled-components'
import {COLORS} from '../constants'
import useFavourite from '../hooks/useFavourite'

interface HeartButtonProps {
  listingId: string
  currentUser?: SafeUser | null
}

const HeartButton: React.FC<HeartButtonProps> = ({listingId, currentUser}) => {
  const {hasFavourited, toggleFavourite} = useFavourite({
    listingId,
    currentUser,
  })

  return (
    <Wrapper onClick={toggleFavourite}>
      <FillHeartButton hasFavourited={hasFavourited}>
        <AiFillHeart size={32} />
      </FillHeartButton>
      <OutlineHeartButton>
        <AiOutlineHeart size={36} />
      </OutlineHeartButton>
    </Wrapper>
  )
}

export default HeartButton

const Wrapper = styled.div`
  position: absolute;
  top: 8px;
  right: 8px;
  z-index: 1;
  cursor: pointer;
  transition: all 0.2s linear;

  &:hover {
    opacity: 0.7;
  }
`

const OutlineHeartButton = styled.div`
  position: absolute;
  top: 0;
  right: 0;
  color: ${COLORS.white};

  &:active {
    transform: scale(0.9);
    transition: transform 0.1s linear;
  }
`
const FillHeartButton = styled.div<{hasFavourited: boolean}>`
  position: absolute;
  top: 2px;
  right: 2px;
  color: ${props => (props.hasFavourited ? COLORS.main : COLORS.textBlur)};

  &:active {
    transform: scale(0.9);
    transition: transform 0.1s linear;
  }
`

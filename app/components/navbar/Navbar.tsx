'use client'

import React from 'react'
import {styled} from 'styled-components'
import Logo from './Logo'
import Search from './Search'
import UserMenu from './UserMenu'
import Categories from './Categories'
import {SafeUser} from '@/app/types'
import {COLORS} from '@/app/constants'
import Container from '../Container'

interface NavbarProps {
  currentUser?: SafeUser | null
}

const Navbar: React.FC<NavbarProps> = ({currentUser}) => {
  return (
    <Wrapper>
      <StyledDiv>
        <StyledNav>
          <Logo />
          <Search />
          <UserMenu currentUser={currentUser} />
        </StyledNav>
      </StyledDiv>
      <Categories />
    </Wrapper>
  )
}

export default Navbar

const Wrapper = styled.div`
  position: fixed;
  display: flex;
  width: 100%;
  justify-content: center;
  flex-direction: column;
  background-color: ${COLORS.white};
  z-index: 100;
`

const StyledDiv = styled.div`
  display: flex;
  flex: 1;
  padding: 0 80px;
  box-shadow: rgb(0 0 0 / 8%) 0 1px 0;
`

const StyledNav = styled.div`
  width: 100%;
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
`

'use client'

import React from 'react'
import {styled} from 'styled-components'
import Logo from './Logo'
import Search from './Search'
import UserMenu from './UserMenu'
import Categories from './Categories'
import {SafeUser} from '@/app/types'
import {COLORS, DEVICES, SIZES} from '@/app/constants'

interface NavbarProps {
  currentUser?: SafeUser | null
}

const Navbar: React.FC<NavbarProps> = ({currentUser}) => {
  return (
    <Wrapper>
      <StyledDiv>
        <Content>
          <StyledNav>
            <Logo />
            <Search />
            <UserMenu currentUser={currentUser} />
          </StyledNav>
        </Content>
      </StyledDiv>
      <Categories />
    </Wrapper>
  )
}

export default Navbar

const Wrapper = styled.div`
  position: fixed;
  width: 100%;
  background-color: ${COLORS.white};
  z-index: 100;
`

const Content = styled.div`
  display: flex;
  width: 100%;
  height: 80px;
  max-width: ${SIZES.desktop};
  margin: auto;
`

const StyledDiv = styled.div`
  display: flex;
  padding: 0 80px;
  box-shadow: rgb(0 0 0 / 8%) 0 1px 0;

  @media ${DEVICES.tablet} {
    padding: 0 20px;
  }
`

const StyledNav = styled.div`
  width: 100%;
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
`

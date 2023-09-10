'use client'

import React, {useCallback, useState} from 'react'
import {RiGlobalLine} from 'react-icons/ri'
import {AiOutlineMenu} from 'react-icons/ai'
import Avatar from '../Avatar'
import MenuItem from './MenuItem'
import {styled} from 'styled-components'
import {COLORS} from '@/app/constants'
import Line from '../Line'
import useRegisterModal from '@/app/hooks/useRegisterModal'
import useLoginModal from '@/app/hooks/useLoginModal'
import {signOut} from 'next-auth/react'
import useRentModal from '@/app/hooks/useRentModal'
import {SafeUser} from '@/app/types'
import {useRouter} from 'next/navigation'

interface UserMenuProps {
  currentUser?: SafeUser | null
}

const UserMenu: React.FC<UserMenuProps> = ({currentUser}) => {
  const router = useRouter()
  const registerModal = useRegisterModal()
  const loginModal = useLoginModal()
  const rentModal = useRentModal()
  const [isOpen, setIsOpen] = useState(false)

  const toggleOpen = () => {
    setIsOpen(value => !value)
  }

  const onRent = useCallback(() => {
    if (!currentUser) {
      return loginModal.onOpen()
    }

    // Open Rent Modal
    rentModal.onOpen()
  }, [currentUser, loginModal, rentModal])

  return (
    <Wrapper>
      <StyledButton onClick={onRent}>Airbnb your home</StyledButton>
      <ChangeLanguageBtn>
        <RiGlobalLine size={20} />
      </ChangeLanguageBtn>
      <Menu onClick={toggleOpen}>
        <MenuIcon>
          <AiOutlineMenu size={18} />
        </MenuIcon>
        <Avatar src={currentUser?.image} />
      </Menu>
      {isOpen && (
        <StyledMenu>
          {currentUser ? (
            <>
              <MenuItem
                onClick={() => router.push('/trips')}
                label="My trips"
              />
              <MenuItem
                onClick={() => router.push('/favourites')}
                label="My favourites"
              />
              <MenuItem
                onClick={() => router.push('/reservations')}
                label="My reservations"
              />
              <MenuItem
                onClick={() => router.push('/properties')}
                label="My properties"
              />
              <MenuItem onClick={onRent} label="Airbnb your home" />
              <Line />
              <MenuItem onClick={() => signOut()} label="Logout" bold />
            </>
          ) : (
            <>
              <MenuItem onClick={registerModal.onOpen} label="Sign up" bold />
              <MenuItem onClick={loginModal.onOpen} label="Log in" />
              <Line />
              <MenuItem onClick={() => {}} label="Airbnb your home" />
              <MenuItem onClick={() => {}} label="Help Center" />
            </>
          )}
        </StyledMenu>
      )}
    </Wrapper>
  )
}

export default UserMenu

const Wrapper = styled.div`
  display: flex;
  justify-content: flex-end;
  align-items: center;
  position: relative;
`

const StyledMenu = styled.div`
  position: absolute;
  top: 48px;
  right: 0;
  background-color: ${COLORS.white};
  box-shadow: 0 2px 16px rgba(0, 0, 0, 0.12);
  border-radius: 12px;
  padding: 8px;
`

const StyledButton = styled.div`
  font-size: 14px;
  text-align: center;
  border-radius: 40px;
  min-width: 80px;
  padding: 12px;
  font-weight: bold;
  user-select: none;
  cursor: pointer;
  transition: background-color 250ms ease;

  &:hover {
    background-color: ${COLORS.backgroundHover};
  }
`

const ChangeLanguageBtn = styled(StyledButton)`
  border-radius: 100px;
  min-width: 46px;
  width: 46px;
  height: 42px;
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 0;
`

const Menu = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 5px;
  margin-left: 8px;
  border: 1px solid ${COLORS.gray};
  border-radius: 21px;
  transition: box-shadow 0.2s cubic-bezier(0.2, 0, 0, 1);
  cursor: pointer;

  &:hover {
    box-shadow: 0 2px 4px rgba(0, 0, 0, 0.18);
  }
`

const MenuIcon = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  margin: 0 8px;
  padding-right: 4px;
`

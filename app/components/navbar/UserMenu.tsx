'use client'

import {COLORS, DEVICES} from '@/app/constants'
import useLoginModal from '@/app/hooks/useLoginModal'
import useRegisterModal from '@/app/hooks/useRegisterModal'
import useRentModal from '@/app/hooks/useRentModal'
import {SafeUser} from '@/app/types'
import Tippy from '@tippyjs/react'
import {signOut} from 'next-auth/react'
import {useRouter} from 'next/navigation'
import React, {useCallback, useState} from 'react'
import {AiOutlineMenu} from 'react-icons/ai'
import {RiGlobalLine} from 'react-icons/ri'
import {styled} from 'styled-components'
import Avatar from '../Avatar'
import Line from '../Line'
import MenuItem from './MenuItem'

interface UserMenuProps {
  currentUser?: SafeUser | null
}

const UserMenu: React.FC<UserMenuProps> = ({currentUser}) => {
  const router = useRouter()
  const registerModal = useRegisterModal()
  const loginModal = useLoginModal()
  const rentModal = useRentModal()

  const [visible, setVisible] = useState(false)
  const toggle = () => {
    setVisible(prev => !prev)
  }
  const hide = () => setVisible(false)

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
      <Tippy
        visible={visible}
        placement="bottom-end"
        interactive={true}
        interactiveDebounce={0}
        onClickOutside={hide}
        content={
          <StyledMenu onClick={hide}>
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
                <MenuItem onClick={rentModal.onOpen} label="Airbnb your home" />
                <MenuItem onClick={() => {}} label="Help Center" />
              </>
            )}
          </StyledMenu>
        }>
        <Menu onClick={toggle}>
          <MenuIcon>
            <AiOutlineMenu size={18} />
          </MenuIcon>
          <StyledAvatar>
            <Avatar src={currentUser?.image} />
          </StyledAvatar>
        </Menu>
      </Tippy>
    </Wrapper>
  )
}

export default UserMenu

const Wrapper = styled.div`
  display: flex;
  justify-content: flex-end;
  align-items: center;
`

const StyledMenu = styled.div`
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

  @media ${DEVICES.laptop} {
    display: none;
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

  @media ${DEVICES.laptop} {
    display: none;
  }
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

  @media ${DEVICES.tablet} {
    padding: 8px 0;
  }
`

const StyledAvatar = styled.div`
  height: 30px;

  @media ${DEVICES.tablet} {
    display: none;
  }
`

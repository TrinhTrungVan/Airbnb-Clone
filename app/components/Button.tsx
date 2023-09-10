'use client'

import React from 'react'
import {IconType} from 'react-icons'
import {styled} from 'styled-components'
import {COLORS} from '../constants'

interface ButtonProps {
  label: string
  onClick: (e: React.MouseEvent<HTMLButtonElement>) => void
  disabled?: boolean
  outline?: boolean
  small?: boolean
  icon?: IconType
}

const Button: React.FC<ButtonProps> = ({
  label,
  onClick,
  disabled,
  outline,
  small,
  icon: Icon,
}) => {
  return (
    <StyledButton
      onClick={onClick}
      disabled={disabled}
      outline={outline}
      small={small}
      icon={!!Icon}>
      {Icon && (
        <StyledIcon>
          <Icon
            size={24}
            color={Icon.name === 'FaFacebookSquare' ? '#1877F2' : ''}
          />
        </StyledIcon>
      )}
      <span>{label}</span>
    </StyledButton>
  )
}

export default Button

const StyledButton = styled.button<{
  disable?: boolean
  outline?: boolean
  small?: boolean
  icon?: boolean
}>`
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: center;
  width: 100%;
  border-radius: 8px;
  border-width: 2px;
  outline: none;
  border-style: solid;
  position: relative;
  background-color: ${props => (props.outline ? COLORS.white : COLORS.main)};
  border-color: ${props => (props.outline ? COLORS.black : COLORS.main)};
  color: ${props => (props.outline ? COLORS.black : COLORS.white)};
  padding: ${props => (props.small ? '8px' : '16px')};
  font-size: ${props => (props.small ? '14px' : '16px')};
  font-weight: ${props => (props.small ? 500 : 700)};
  cursor: pointer;
  transition: ${props => (props.disabled ? 'none' : 'all 0.25s linear')};

  &:hover {
    opacity: 0.7;
  }

  &:disabled {
    opacity: 0.5;
    cursor: not-allowed;
  }

  &:active {
    transform: scale(0.95);
    transition: transform 0.1s linear;
  }

  & > span {
    padding-left: ${props => (props.icon ? '24px' : '0')};
  }
`

const StyledIcon = styled.div`
  position: absolute;
  left: 12px;
  top: 12px;
  display: flex;
  justify-content: center;
  align-items: center;
`

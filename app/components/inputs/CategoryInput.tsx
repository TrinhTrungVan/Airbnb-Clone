'use client'

import {COLORS} from '@/app/constants'
import React from 'react'
import {IconType} from 'react-icons'
import {styled} from 'styled-components'

interface CategoruInputProps {
  icon: IconType
  label: string
  selected?: boolean
  onClick: (value: string) => void
}

const CategoryInput: React.FC<CategoruInputProps> = ({
  icon: Icon,
  label,
  selected,
  onClick,
}) => {
  return (
    <Wrapper onClick={() => onClick(label)} selected={selected}>
      <Icon size={30} />
      <div>{label}</div>
    </Wrapper>
  )
}

export default CategoryInput

const Wrapper = styled.div<{selected?: boolean}>`
  display: flex;
  flex-direction: column;
  padding: 16px;
  border: 3px solid ${COLORS.gray};
  border-color: ${props => (props.selected ? COLORS.text : COLORS.gray)};
  border-radius: 16px;
  cursor: pointer;
  user-select: none;
  transition: all 0.25s linear;

  &:hover {
    border-color: ${COLORS.text};
  }
`

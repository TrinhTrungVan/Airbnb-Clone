'use client'

import {styled} from 'styled-components'

interface MenuItemProps {
  onClick: () => void
  label: string
  bold?: boolean
}

const MenuItem: React.FC<MenuItemProps> = ({onClick, label, bold = false}) => {
  return (
    <StyledDiv onClick={onClick} bold={bold}>
      {label}
    </StyledDiv>
  )
}

export default MenuItem

const StyledDiv = styled.div<{bold: boolean}>`
  font-weight: ${props => (props.bold ? 'bold' : '')};
  padding: 12px 16px;
  cursor: pointer;
  user-select: none;
`

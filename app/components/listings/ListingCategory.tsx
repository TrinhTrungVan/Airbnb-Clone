'use client'

import React from 'react'
import {IconType} from 'react-icons'
import {styled} from 'styled-components'

interface ListingCategoryProps {
  icon: IconType
  label: string
  description: string
}

const ListingCategory: React.FC<ListingCategoryProps> = ({
  icon: Icon,
  label,
  description,
}) => {
  return (
    <Wrapper>
      <Icon size={40} />
      <StyledDiv>
        <Label>{label}</Label>
        <div>{description}</div>
      </StyledDiv>
    </Wrapper>
  )
}

export default ListingCategory

const Wrapper = styled.div`
  margin: 32px 0;
  display: flex;
  flex-direction: row;
`

const StyledDiv = styled.div`
  display: flex;
  flex-direction: column;
  margin-left: 16px;
`

const Label = styled.div`
  font-size: 20px;
  font-weight: bold;
  margin-bottom: 8px;
`

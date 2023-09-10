'use client'

import React from 'react'
import {styled} from 'styled-components'
import {COLORS} from '../constants'

interface LineProps {
  direction?: 'horizontal' | 'vertical'
  width?: number
  label?: string
}

const Line: React.FC<LineProps> = ({
  direction = 'horizontal',
  width,
  label,
}) => {
  return (
    <Wrapper>
      {direction === 'horizontal' ? (
        <HorizontalLine width={width} />
      ) : (
        <VerticalLine width={width} />
      )}
      <StyledLabel>{label}</StyledLabel>
    </Wrapper>
  )
}

export default Line

const Wrapper = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: center;
  position: relative;
  margin: 4px 0;
`

const HorizontalLine = styled.div<{width?: number}>`
  background-color: rgb(221, 221, 221);
  width: ${props => (props.width ? props.width + 'px' : '100%')};
  height: 1px;
`

const VerticalLine = styled.div<{width?: number}>`
  background-color: rgb(221, 221, 221);
  height: ${props => (props.width ? props.width + 'px' : '100%')};
  width: 1px;
`

const StyledLabel = styled.label`
  font-size: 12px;
  position: absolute;
  top: -5px;
  padding: 0 8px;
  background-color: ${COLORS.white};
  color: ${COLORS.textBlur};
`

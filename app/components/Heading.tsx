import React from 'react'
import {styled} from 'styled-components'
import {COLORS} from '../constants'

interface HeadingProps {
  title: string
  subtitle?: string
  center?: boolean
}

const Heading: React.FC<HeadingProps> = ({title, subtitle, center}) => {
  return (
    <Wrapper center={center}>
      <Title>{title}</Title>
      <SubTitle>{subtitle}</SubTitle>
    </Wrapper>
  )
}

export default Heading

const Wrapper = styled.div<{center?: boolean}>`
  text-align: ${props => (props.center ? 'center' : 'start')};
`

const Title = styled.div`
  font-size: 22px;
  font-weight: bold;
  color: ${COLORS.text};
  margin-bottom: 8px;
`

const SubTitle = styled.div`
  font-size: 16px;
  color: ${COLORS.textBlur};
`

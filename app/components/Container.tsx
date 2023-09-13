'use client'

import {styled} from 'styled-components'
import {DEVICES, SIZES} from '../constants'

interface ContainerProps {
  children: React.ReactNode
}

const Container: React.FC<ContainerProps> = ({children}) => {
  return <Wrapper>{children}</Wrapper>
}

export default Container

const Wrapper = styled.div`
  max-width: ${SIZES.desktop};
  padding: 0 80px;
  margin: auto;

  @media ${DEVICES.tablet} {
    padding: 0 20px;
  }
`

'use client'

import React from 'react'
import {PuffLoader} from 'react-spinners'
import styled from 'styled-components'
import {COLORS} from '../constants'

const Loader = () => {
  return (
    <Wrapper>
      <PuffLoader size={100} color={COLORS.main} />
    </Wrapper>
  )
}

export default Loader

const Wrapper = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  height: 70vh;
`

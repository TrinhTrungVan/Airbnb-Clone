'use client'

import {DEVICES} from '@/app/constants'
import Image from 'next/image'
import {useRouter} from 'next/navigation'
import styled from 'styled-components'

const Logo = () => {
  const router = useRouter()
  return (
    <Wrapper>
      <Image
        onClick={() => router.push('/')}
        alt="Logo"
        width="102"
        height="32"
        src="/images/logo.svg"
        priority={true}
        style={logoStyles}
      />
    </Wrapper>
  )
}

export default Logo

const Wrapper = styled.div`
  @media ${DEVICES.tablet} {
    display: none;
  }
`

const logoStyles = {
  cursor: 'pointer',
}

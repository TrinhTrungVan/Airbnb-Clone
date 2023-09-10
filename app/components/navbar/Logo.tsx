'use client'

import Image from 'next/image'
import {useRouter} from 'next/navigation'

const Logo = () => {
  const router = useRouter()
  return (
    <Image
      onClick={() => router.push('/')}
      alt="Logo"
      width="102"
      height="32"
      src="/images/logo.svg"
      priority={true}
      style={logoStyles}
    />
  )
}

export default Logo

const logoStyles = {
  cursor: 'pointer',
  padding: '24px 0',
}

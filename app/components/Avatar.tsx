'use client'

import Image from 'next/image'

interface AvatarProps {
  src: string | null | undefined
  size?: 'large' | 'small' | undefined
}

const Avatar: React.FC<AvatarProps> = ({src, size = 'small'}) => {
  return (
    <Image
      width={size === 'large' ? 48 : 30}
      height={size === 'large' ? 48 : 30}
      alt="Avatar"
      src={src || '/images/avatar_placeholder.jpg'}
      style={avatarStyles}
    />
  )
}

export default Avatar

const avatarStyles = {
  borderRadius: 100,
  cursor: 'pointer',
}

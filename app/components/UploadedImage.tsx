'use client'

import React from 'react'
import {styled} from 'styled-components'
import Image from 'next/image'
import {IoMdClose} from 'react-icons/io'
import {COLORS} from '../constants'

interface UploadedImageProps {
  imageSrc: string
  handleDelete: (value: string) => void
}

const UploadedImage: React.FC<UploadedImageProps> = ({
  imageSrc,
  handleDelete,
}) => {
  return (
    <StyledImage>
      <button onClick={() => handleDelete(imageSrc)}>
        <IoMdClose size={18} />
      </button>
      <Image
        fill
        style={{objectFit: 'cover'}}
        src={imageSrc}
        alt="House"
        sizes="(max-width: 768px) 100vw"
      />
    </StyledImage>
  )
}

export default UploadedImage

const StyledImage = styled.div`
  border-radius: 8px;
  position: relative;
  overflow: hidden;
  border: 1px solid ${COLORS.textBlur};
  transition: all 0.25s linear;

  &:hover > button {
    visibility: visible;
  }

  &:hover > img {
    transition: opacity 0.2s linear;
    opacity: 0.5;
  }

  & > button {
    display: flex;
    visibility: hidden;
    justify-content: center;
    align-items: center;
    border: 1px solid ${COLORS.textBlur};
    outline: none;
    width: 32px;
    height: 32px;
    background-color: ${COLORS.white};
    border-radius: 50%;
    position: absolute;
    z-index: 1000;
    top: 8px;
    right: 8px;
    cursor: pointer;
  }
`

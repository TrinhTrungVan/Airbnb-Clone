'use client'

import React, {useCallback, useState} from 'react'

import {CldUploadWidget} from 'next-cloudinary'
import {TbPhotoPlus} from 'react-icons/tb'
import {styled} from 'styled-components'
import {COLORS} from '@/app/constants'
import UploadedImage from '../UploadedImage'

declare global {
  var cloudinary: any
}

interface ImageUploadProps {
  onChange: (value: string[]) => void
  value: string[]
}

const ImageUpload: React.FC<ImageUploadProps> = ({onChange, value}) => {
  const handleUpload = useCallback(
    (result: any) => {
      onChange([...value, result.info.secure_url])
    },
    [onChange, value],
  )

  const handleDelete = useCallback(
    (imageScr: string) => {
      const newArr = value.filter(item => item !== imageScr)
      onChange(newArr)
    },
    [onChange, value],
  )

  return (
    <UploadArea length={value.length}>
      {value.length > 0 &&
        value.map(item => (
          <UploadedImage
            imageSrc={item}
            handleDelete={handleDelete}
            key={item}
          />
        ))}
      <CldUploadWidget
        onUpload={handleUpload}
        uploadPreset="airbnb_clone"
        options={{
          autoMinimize: true,
          maxFiles: 1,
        }}>
        {({open}) => {
          if (value.length >= 9) return <></>
          return (
            <UploadBtn onClick={() => open?.()}>
              <TbPhotoPlus size={32} />
              <div>Upload</div>
            </UploadBtn>
          )
        }}
      </CldUploadWidget>
    </UploadArea>
  )
}

export default ImageUpload

const UploadArea = styled.div<{length: any}>`
  display: grid;
  min-height: 25vh;
  grid-template-columns: repeat(4, 1fr);
  grid-template-rows: ${props =>
    props.length >= 5 ? 'repeat(3, 1fr)' : 'repeat(2, 1fr)'};
  gap: 16px;
  padding: ${props => (props.length == 0 ? '0px' : '16px')};
  border-radius: 8px;
  border-width: ${props => (props.length == 0 ? '0px' : '2px')};
  border-style: ${props => (props.length == 0 ? 'dashed' : 'solid')};
  border-color: ${COLORS.text};
  color: ${COLORS.textBlur};

  & > :first-child {
    grid-column: ${props => (props.length == 0 ? '1 / span 4' : '1 / span 2')};
    grid-row: 1 / span 2;
  }
`

const UploadBtn = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
  gap: 8px;
  border-radius: 8px;
  border: 3px dashed ${COLORS.gray};
  padding: 24px;
  cursor: pointer;

  &:hover {
    opacity: 0.7;
  }

  & > div {
    font-weight: bold;
    font-size: 16px;
  }
`

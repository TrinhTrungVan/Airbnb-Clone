'use client'

import useCountries from '@/app/hooks/useCountries'
import {SafeUser} from '@/app/types'
import React from 'react'
import Heading from '../Heading'
import Image from 'next/image'
import {styled} from 'styled-components'
import Button from '../Button'
import {BsGrid3X3GapFill} from 'react-icons/bs'
import HeartButton from '../HeartButton'
import ShareButton from '../ShareButton'
import {COLORS, DEVICES} from '@/app/constants'

interface ListingHeadProps {
  id: string
  title: string
  locationValue: string
  images: string[]
  currentUser?: SafeUser | null
}

const ListingHead: React.FC<ListingHeadProps> = ({
  id,
  title,
  images,
  locationValue,
  currentUser,
}) => {
  const {getByValue} = useCountries()
  const location = getByValue(locationValue)

  return (
    <Wrapper>
      <MediaQuery>
        <Heading
          title={title}
          subtitle={`${location?.region}, ${location?.label}`}
        />
      </MediaQuery>
      <Images>
        <FirstImage>
          <Image
            src={images[0]}
            fill
            className="object-cover w-full"
            alt="Image"
          />
        </FirstImage>
        {images.slice(1, 5).map(item => (
          <StyledImage key={item}>
            <Image
              src={item}
              fill
              className="object-cover w-full"
              alt="Image"
            />
          </StyledImage>
        ))}
      </Images>
      <ShareButton />
      <HeartButton listingId={id} currentUser={currentUser} />
      <StyledButton>
        <Button
          label="Show all images"
          onClick={() => {}}
          outline
          icon={BsGrid3X3GapFill}
        />
      </StyledButton>
    </Wrapper>
  )
}

export default ListingHead

const Wrapper = styled.div`
  position: relative;
`

const Images = styled.div`
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  gap: 16px;
  width: 100%;
  height: 60vh;
  overflow: hidden;
  border-radius: 16px;
  margin-top: 32px;
  position: relative;

  @media ${DEVICES.laptop} {
    height: 40vh;
  }

  @media ${DEVICES.tablet} {
    height: 35vh;
  }
`

const FirstImage = styled.div`
  position: relative;
  cursor: pointer;
  grid-column: 1 / span 2;
  grid-row: 1 / span 2;

  @media ${DEVICES.mobileL} {
    grid-column: 1 / span 4;
    grid-row: 1 / span 2;
  }
`

const StyledImage = styled.div`
  position: relative;
  cursor: pointer;

  @media ${DEVICES.mobileL} {
    display: none;
  }
`

const StyledButton = styled.div`
  width: 220px;
  position: absolute;
  bottom: 32px;
  right: 32px;
`

const MediaQuery = styled.div`
  @media ${DEVICES.tablet} {
    max-width: 80%;
  }
`

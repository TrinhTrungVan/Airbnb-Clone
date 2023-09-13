'use client'

import {COLORS, DEVICES} from '@/app/constants'
import dynamic from 'next/dynamic'
import useCountries from '@/app/hooks/useCountries'
import {SafeUser} from '@/app/types'
import React from 'react'
import {IconType} from 'react-icons'
import {styled} from 'styled-components'
import Avatar from '../Avatar'
import Line from '../Line'
import ListingCategory from './ListingCategory'

const Map = dynamic(() => import('../Map'), {
  ssr: false,
})

interface ListingInfoProps {
  user: SafeUser
  description: string
  guestCount: number
  roomCount: number
  bathroomCount: number
  category:
    | {
        icon: IconType
        label: string
        description: string
      }
    | undefined
  locationValue: string
}

const ListingInfo: React.FC<ListingInfoProps> = ({
  user,
  description,
  guestCount,
  roomCount,
  bathroomCount,
  category,
  locationValue,
}) => {
  const {getByValue} = useCountries()

  const coordinates = getByValue(locationValue)?.latlng

  return (
    <Wrapper>
      <StyledHost>
        <div>{`Hosted by ${user.name}`}</div>
        <Avatar src={user.image} size="large" />
      </StyledHost>
      <Rooms>
        <div>{guestCount} guests</div>
        &#8226;
        <div>{roomCount} rooms</div>
        &#8226;
        <div>{bathroomCount} bathrooms</div>
      </Rooms>
      <Line />
      {category && (
        <ListingCategory
          icon={category.icon}
          label={category.label}
          description={category.description}
        />
      )}
      <Line />
      <Description>{description}</Description>
      <Line />
      <StyledMap>
        <Map center={coordinates} />
      </StyledMap>
    </Wrapper>
  )
}

export default ListingInfo

const Wrapper = styled.div`
  width: 60%;
  padding-right: 100px;

  @media ${DEVICES.laptopL} {
    width: 50%;
    padding-right: 48px;
  }

  @media ${DEVICES.tablet} {
    width: 100%;
  }
`

const StyledHost = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  flex-direction: row;
  font-size: 20px;
  font-weight: bold;
`

const Rooms = styled.div`
  display: flex;
  flex-direction: row;
  gap: 8px;
  margin-bottom: 32px;
`

const Description = styled.div`
  margin: 32px 0;
  line-height: 1.6;
`

const StyledMap = styled.div`
  margin: 32px 0;
`

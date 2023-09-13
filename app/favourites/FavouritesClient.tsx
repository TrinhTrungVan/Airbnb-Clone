'use client'

import React from 'react'
import {styled} from 'styled-components'
import Container from '../components/Container'
import Heading from '../components/Heading'
import ListingCard from '../components/listings/ListingCard'
import {SafeListing, SafeUser} from '../types'
import {DEVICES} from '../constants'

interface FavouritesClientProps {
  listings: SafeListing[]
  currentUser?: SafeUser | null
}

const FavouritesClient: React.FC<FavouritesClientProps> = ({
  listings,
  currentUser,
}) => {
  return (
    <Container>
      <Wrapper>
        <Heading
          title="Favourites"
          subtitle="List of places you have favourited!"
        />
        <Content>
          {listings.map(listing => (
            <ListingCard
              key={listing.id}
              data={listing}
              currentUser={currentUser}
            />
          ))}
        </Content>
      </Wrapper>
    </Container>
  )
}

export default FavouritesClient

const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
`

const Content = styled.div`
  display: grid;
  grid-template-columns: repeat(5, 1fr);
  gap: 32px;
  width: 100%;
  padding-top: 32px;

  @media ${DEVICES.laptopL} {
    grid-template-columns: repeat(4, 1fr);
  }

  @media ${DEVICES.laptop} {
    grid-template-columns: repeat(3, 1fr);
  }

  @media ${DEVICES.tablet} {
    grid-template-columns: repeat(2, 1fr);
  }

  @media ${DEVICES.mobileL} {
    grid-template-columns: 1fr;
  }
`

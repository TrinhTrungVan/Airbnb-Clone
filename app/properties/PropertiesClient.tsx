'use client'

import axios from 'axios'
import {useRouter} from 'next/navigation'
import React, {useCallback, useState} from 'react'
import {toast} from 'react-hot-toast'
import {styled} from 'styled-components'
import Container from '../components/Container'
import Heading from '../components/Heading'
import ListingCard from '../components/listings/ListingCard'
import {SafeListing, SafeUser} from '../types'
import {DEVICES} from '../constants'

interface PropertiesClientProps {
  listings: SafeListing[]
  currentUser?: SafeUser | null
}

const PropertiesClient: React.FC<PropertiesClientProps> = ({
  listings,
  currentUser,
}) => {
  const router = useRouter()
  const [deletingId, setDeletingId] = useState('')

  const onCancel = useCallback(
    (id: string) => {
      setDeletingId(id)

      axios
        .delete(`/api/listings/${id}`)
        .then(() => {
          toast.success('Listing deleted!')
          router.refresh()
        })
        .catch(error => {
          toast.error(error?.response?.data?.error)
        })
        .finally(() => {
          setDeletingId('')
        })
    },
    [router],
  )

  return (
    <Container>
      <Wrapper>
        <Heading title="Properties" subtitle="List of your properties" />
        <Content>
          {listings.map(listing => (
            <ListingCard
              key={listing.id}
              data={listing}
              actionId={listing.id}
              onAction={onCancel}
              disabled={deletingId === listing.id}
              actionLabel="Delete properties"
              currentUser={currentUser}
            />
          ))}
        </Content>
      </Wrapper>
    </Container>
  )
}

export default PropertiesClient

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

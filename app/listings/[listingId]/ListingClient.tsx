'use client'

import Container from '@/app/components/Container'
import ListingHead from '@/app/components/listings/ListingHead'
import ListingInfo from '@/app/components/listings/ListingInfo'
import ListingReservation from '@/app/components/listings/ListingReservation'
import {CATEGORIES} from '@/app/components/navbar/Categories'
import {DEVICES, SIZES} from '@/app/constants'
import useLoginModal from '@/app/hooks/useLoginModal'
import {SafeListing, SafeReservation, SafeUser} from '@/app/types'
import axios from 'axios'
import {differenceInDays, eachDayOfInterval} from 'date-fns'
import {useRouter} from 'next/navigation'
import React, {useCallback, useEffect, useMemo, useState} from 'react'
import {Range} from 'react-date-range'
import {toast} from 'react-hot-toast'
import {styled} from 'styled-components'

const initialDateRange = {
  startDate: new Date(),
  endDate: new Date(),
  key: 'selection',
}

interface ListingClientProps {
  reservations?: SafeReservation[]
  listing: SafeListing & {user: SafeUser}
  currentUser?: SafeUser | null
}

const ListingClient: React.FC<ListingClientProps> = ({
  listing,
  reservations = [],
  currentUser,
}) => {
  const loginModal = useLoginModal()
  const router = useRouter()

  const disabledDates = useMemo(() => {
    let dates: Date[] = []

    reservations.forEach(reservation => {
      const range = eachDayOfInterval({
        start: new Date(reservation.startDate),
        end: new Date(reservation.endDate),
      })

      dates = [...dates, ...range]
    })
    return dates
  }, [reservations])

  const [isLoading, setIsLoading] = useState(false)
  const [totalPrice, setTotalPrice] = useState(listing.price)
  const [dateRange, setDateRange] = useState<Range>(initialDateRange)

  const onCreateReservation = useCallback(() => {
    if (!currentUser) {
      return loginModal.onOpen()
    }

    setIsLoading(true)

    axios
      .post('/api/reservations', {
        totalPrice,
        startDate: dateRange.startDate,
        endDate: dateRange.endDate,
        listingId: listing.id,
      })
      .then(() => {
        toast.success('Listing reserved!')
        setDateRange(initialDateRange)
        router.refresh()
        router.push('/trips')
      })
      .catch(() => {
        toast.error('Something went wrong.')
      })
      .finally(() => {
        setIsLoading(false)
      })
  }, [totalPrice, dateRange, listing.id, router, loginModal, currentUser])

  useEffect(() => {
    if (dateRange.startDate && dateRange.endDate) {
      const dayCount = differenceInDays(dateRange.endDate, dateRange.startDate)

      if (dayCount && listing.price) {
        setTotalPrice(dayCount * listing.price)
      } else {
        setTotalPrice(listing.price)
      }
    }
  }, [dateRange, listing.price])

  const category = useMemo(() => {
    return CATEGORIES.find(item => item.label === listing.category)
  }, [listing.category])

  return (
    <Container>
      <Wrapper>
        <ListingHead
          id={listing.id}
          currentUser={currentUser}
          title={listing.title}
          images={listing.images}
          locationValue={listing.locationValue}
        />
        <StyledDiv>
          <ListingInfo
            user={listing.user}
            category={category}
            description={listing.description}
            roomCount={listing.roomCount}
            guestCount={listing.guestCount}
            bathroomCount={listing.bathroomCount}
            locationValue={listing.locationValue}
          />
          <ListingReservation
            price={listing.price}
            totalPrice={totalPrice}
            onChangeDate={value => setDateRange(value)}
            dateRange={dateRange}
            onSubmit={onCreateReservation}
            disabled={isLoading}
            disabledDates={disabledDates}
          />
        </StyledDiv>
      </Wrapper>
    </Container>
  )
}

export default ListingClient

const Wrapper = styled.div`
  width: 100%;
  max-width: ${SIZES.laptopL};
  margin: auto;
`

const StyledDiv = styled.div`
  display: flex;
  flex-direction: row;
  margin-top: 32px;

  @media ${DEVICES.tablet} {
    flex-direction: column;
  }

  @media ${DEVICES.mobileL} {
  }
`

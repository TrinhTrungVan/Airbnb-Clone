'use client'

import React, {useCallback, useState} from 'react'
import {SafeReservation, SafeUser} from '../types'
import Container from '../components/Container'
import Heading from '../components/Heading'
import {styled} from 'styled-components'
import {useRouter} from 'next/navigation'
import axios from 'axios'
import {toast} from 'react-hot-toast'
import ListingCard from '../components/listings/ListingCard'

interface ReservationsClientProps {
  reservations: SafeReservation[]
  currentUser?: SafeUser | null
}

const ReservationsClient: React.FC<ReservationsClientProps> = ({
  reservations,
  currentUser,
}) => {
  const router = useRouter()
  const [deletingId, setDeletingId] = useState('')

  const onCancel = useCallback(
    (id: string) => {
      setDeletingId(id)

      axios
        .delete(`/api/reservations/${id}`)
        .then(() => {
          toast.success('Reservation cancelled!')
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
        <Heading title="Reservation" subtitle="Booking on your properties" />
        <Content>
          {reservations.map(reservation => (
            <ListingCard
              key={reservation.id}
              data={reservation.listing}
              reservation={reservation}
              actionId={reservation.id}
              onAction={onCancel}
              disabled={deletingId === reservation.id}
              actionLabel="Cancel reservation"
              currentUser={currentUser}
            />
          ))}
        </Content>
      </Wrapper>
    </Container>
  )
}

export default ReservationsClient

const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
`

const Content = styled.div`
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  gap: 32px;
  width: 100%;
  padding-top: 32px;
`

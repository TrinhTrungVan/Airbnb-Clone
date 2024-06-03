'use client'

import React, {CSSProperties, useCallback, useMemo} from 'react'
import useCountries from '@/app/hooks/useCountries'
import {SafeListing, SafeReservation, SafeUser} from '@/app/types'
import {Listing, Reservation} from '@prisma/client'
import {useRouter} from 'next/navigation'
import {format} from 'date-fns'
import {styled} from 'styled-components'
import HeartButton from '../HeartButton'
import Image from 'next/image'
import {COLORS} from '@/app/constants'
import Button from '../Button'
import Slider from '../Slider'

interface ListingCardProps {
  data: SafeListing
  reservation?: SafeReservation
  onAction?: (id: string) => void
  disabled?: boolean
  actionLabel?: string
  actionId?: string
  currentUser?: SafeUser | null
}

const ListingCard: React.FC<ListingCardProps> = ({
  data,
  reservation,
  onAction,
  disabled,
  actionLabel,
  actionId = '',
  currentUser,
}) => {
  const router = useRouter()
  const {getByValue} = useCountries()

  const location = getByValue(data.locationValue)

  const handleCancel = useCallback(
    (e: React.MouseEvent<HTMLButtonElement>) => {
      e.stopPropagation()

      if (disabled) {
        return
      }

      onAction?.(actionId)
    },
    [onAction, actionId, disabled],
  )

  const price = useMemo(() => {
    if (reservation) {
      return reservation.totalPrice
    }

    return data.price
  }, [reservation, data.price])

  const reservationDate = useMemo(() => {
    if (!reservation) {
      return null
    }

    const start = new Date(reservation.startDate)
    const end = new Date(reservation.endDate)

    return `${format(start, 'PP')} - ${format(end, 'PP')}`
  }, [reservation])

  return (
    <Wrapper
      onClick={() => router.push(`/listings/${data.id}`)}
      hasButton={!!onAction && !!actionLabel}>
      <StyledImage>
        <Slider data={data.images.slice(0, 5)} />
        <HeartButton listingId={data.id} currentUser={currentUser} />
      </StyledImage>
      <Location>
        {location?.region}, {location?.label}
      </Location>
      <Category>{reservationDate || data.category}</Category>
      <Price>
        {`$ ${price}`}
        {!reservation && <div>/ night</div>}
      </Price>
      {onAction && actionLabel && (
        <Button
          disabled={disabled}
          small
          label={actionLabel}
          onClick={handleCancel}
        />
      )}
    </Wrapper>
  )
}

export default ListingCard

const Wrapper = styled.div<{hasButton: boolean}>`
  cursor: pointer;
  position: relative;
  margin-bottom: ${props => (props.hasButton ? '150px' : '100px')};
  min-width: 0;
`

const StyledImage = styled.div`
  width: 100%;
  height: 100%;
  aspect-ratio: 4/3;
`

const imageStyle: CSSProperties = {
  objectFit: 'cover',
  borderRadius: 16,
}

const Location = styled.div`
  margin-top: 16px;
  font-size: 18px;
  font-weight: bold;
  color: ${COLORS.text};
`

const Category = styled.div`
  margin-top: 8px;
  color: ${COLORS.textBlur};
`

const Price = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  margin: 16px 0;
  font-size: 18px;
  font-weight: bold;

  & > div {
    font-weight: lighter;
    margin-left: 4px;
  }
`

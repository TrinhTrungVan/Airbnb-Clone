'use client'

import {COLORS} from '@/app/constants'
import React from 'react'

import {Range} from 'react-date-range'
import {styled} from 'styled-components'
import Line from '../Line'
import Calendar from '../inputs/Calendar'
import Button from '../Button'

interface ListingReservationProps {
  price: number
  dateRange: Range
  totalPrice: number
  onChangeDate: (value: Range) => void
  onSubmit: () => void
  disabled?: boolean
  disabledDates: Date[]
}

const ListingReservation: React.FC<ListingReservationProps> = ({
  price,
  totalPrice,
  dateRange,
  onChangeDate,
  onSubmit,
  disabled,
  disabledDates,
}) => {
  return (
    <Wrapper>
      <Price>
        <div>$ {price}</div>
        <label> night</label>
      </Price>
      <Line />
      <Calendar
        value={dateRange}
        disabledDates={disabledDates}
        onChange={value => onChangeDate(value.selection)}
      />
      <Line />
      <ReserveButton>
        <Button label="Reserve" disabled={disabled} onClick={onSubmit} />
      </ReserveButton>
      <TotalPrice>
        <label> Total</label>
        <div>$ {totalPrice}</div>
      </TotalPrice>
    </Wrapper>
  )
}

export default ListingReservation

const Wrapper = styled.div`
  display: flex;
  flex: 1;
  height: fit-content;
  flex-direction: column;
  border-radius: 8px;
  border: 2px solid ${COLORS.text};
  padding-bottom: 4px;
  overflow: hidden;
`

const Price = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  padding: 24px;

  & > div {
    font-size: 20px;
    font-weight: bold;
  }

  & > label {
    font-weight: 400;
    margin-left: 4px;
  }
`

const TotalPrice = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
  padding: 24px;
  & > div {
    font-size: 20px;
    font-weight: bold;
  }

  & > label {
    font-size: 20px;
    font-weight: bold;
    margin-left: 4px;
  }
`

const ReserveButton = styled.div`
  padding: 32px;
`

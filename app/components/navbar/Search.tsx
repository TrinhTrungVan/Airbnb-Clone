'use client'

import {COLORS, DEVICES} from '@/app/constants'
import {BiSearch} from 'react-icons/bi'
import {styled} from 'styled-components'
import Line from '../Line'
import useSearchModal from '@/app/hooks/useSearchModal'
import {useSearchParams} from 'next/navigation'
import useCountries from '@/app/hooks/useCountries'
import {useMemo} from 'react'
import {differenceInDays} from 'date-fns'

const Search = () => {
  const searchModal = useSearchModal()
  const params = useSearchParams()
  const {getByValue} = useCountries()

  const locationValue = params?.get('locationValue')
  const startDate = params?.get('startDate')
  const endDate = params?.get('endDate')
  const guestCount = params?.get('guestCount')

  const locationLabel = useMemo(() => {
    if (locationValue) {
      return getByValue(locationValue as string)?.label
    }

    return 'Anywhere'
  }, [getByValue, locationValue])

  const durationLabel = useMemo(() => {
    if (startDate && endDate) {
      const start = new Date(startDate as string)
      const end = new Date(endDate as string)

      let diff = differenceInDays(end, start)

      if (diff === 0) {
        diff = 1
      }

      return `${diff} Days`
    }

    return 'Any week'
  }, [endDate, startDate])

  const guestLabel = useMemo(() => {
    if (guestCount) {
      return `${guestCount} Guests`
    }
    return 'Add Guests'
  }, [guestCount])

  return (
    <Wrapper onClick={() => searchModal.onOpen()}>
      <StyledButton bold>{locationLabel}</StyledButton>
      <MediaQuery>
        <Line direction="vertical" width={24} />
      </MediaQuery>
      <MediaQuery>
        <StyledButton bold>{durationLabel}</StyledButton>
      </MediaQuery>
      <MediaQuery>
        <Line direction="vertical" width={24} />
      </MediaQuery>
      <SearchWrapper>
        <MediaQuery>
          <StyledButton>{guestLabel}</StyledButton>
        </MediaQuery>
        <SearchIcon>
          <BiSearch size={18} />
        </SearchIcon>
      </SearchWrapper>
    </Wrapper>
  )
}

export default Search

const Wrapper = styled.div`
  display: flex;
  border: 1px solid ${COLORS.gray};
  align-items: center;
  box-shadow:
    0 1px 2px rgba(0, 0, 0, 0.08),
    0 4px 12px rgba(0, 0, 0, 0.05);
  border-radius: 40px;
  font-size: 14px;
  height: 48px;

  &:hover {
    box-shadow: 0 2px 4px rgba(0, 0, 0, 0.18);
  }
  transition: box-shadow 0.2s cubic-bezier(0.2, 0, 0, 1);

  @media ${DEVICES.tablet} {
    flex: 1;
    margin-right: 8px;
  }
`

const StyledButton = styled.div<{bold?: boolean}>`
  text-align: center;
  border-radius: 40px;
  min-width: 80px;
  padding: 0 12px;
  font-weight: ${props => (props.bold ? 'bold' : '')};
  color: ${props => (props.bold ? COLORS.text : COLORS.textBlur)};
  user-select: none;
  cursor: pointer;

  @media ${DEVICES.tablet} {
    flex: 1;
  }
`

const SearchWrapper = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: center;

  @media ${DEVICES.tablet} {
    flex: 1;
  }

  @media ${DEVICES.mobileL} {
    flex: 0;
  }
`

const SearchIcon = styled.div`
  background-color: ${COLORS.main};
  border-radius: 100px;
  color: ${COLORS.white};
  width: 32px;
  height: 32px;
  display: flex;
  justify-content: center;
  align-items: center;
  margin-right: 8px;
  cursor: pointer;
`

const MediaQuery = styled.div`
  @media ${DEVICES.tablet} {
    flex: 1;
  }

  @media ${DEVICES.mobileL} {
    display: none;
  }
`

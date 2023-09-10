'use client'

import {COLORS} from '@/app/constants'
import useCountries from '@/app/hooks/useCountries'
import React from 'react'
import Select from 'react-select'
import {styled} from 'styled-components'

export type CountrySelectValue = {
  flag: string
  label: string
  latlng: number[]
  region: string
  value: string
}

interface CountrySelectProps {
  value?: CountrySelectValue
  onChange: (value: CountrySelectValue) => void
}

const CountrySelect: React.FC<CountrySelectProps> = ({value, onChange}) => {
  const {getAll} = useCountries()

  return (
    <Wrapper>
      <Select
        placeholder="Anywhere"
        isClearable
        options={getAll()}
        value={value}
        onChange={value => onChange(value as CountrySelectValue)}
        formatOptionLabel={(option: any) => (
          <OptionLabel>
            <p>{option.flag}</p>
            <div>
              {option.label}, <span>{option.region}</span>
            </div>
          </OptionLabel>
        )}
        styles={{
          control: styles => ({...styles, padding: 12}),
          input: styles => ({...styles, fontWeight: 'bold'}),
        }}
        theme={theme => ({
          ...theme,
          borderRadius: 6,
          colors: {
            ...theme.colors,
            primary: 'black',
            primary25: '#ffe4e6',
          },
        })}
      />
    </Wrapper>
  )
}

export default CountrySelect

const Wrapper = styled.div`
  margin-bottom: 32px;
`
const OptionLabel = styled.div`
  display: flex;
  align-items: center;
  flex-direction: row;
  gap: 12px;
  font-weight: bold;
  height: 32px;

  & span {
    color: ${COLORS.textBlur};
  }
`

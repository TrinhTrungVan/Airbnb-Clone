'use client'

import React, {useCallback} from 'react'
import {IconType} from 'react-icons'
import {styled} from 'styled-components'
import {COLORS} from '../constants'
import {useRouter, useSearchParams} from 'next/navigation'
import qs from 'query-string'

interface CategoryBoxProps {
  icon: IconType
  label: string
  selected?: boolean
}

const CategoryBox: React.FC<CategoryBoxProps> = ({
  icon: Icon,
  label,
  selected,
}) => {
  const router = useRouter()
  const params = useSearchParams()

  const handleClick = useCallback(() => {
    let currentQuery = {}

    if (params) {
      currentQuery = qs.parse(params.toString())
    }

    const updatedQuery: any = {
      ...currentQuery,
      category: label,
    }

    // Delete category when click again
    if (params?.get('category') === label) {
      delete updatedQuery.category
    }

    const url = qs.stringifyUrl(
      {
        url: '/',
        query: updatedQuery,
      },
      {skipNull: true},
    )

    router.push(url)
  }, [label, params, router])

  return (
    <Wrapper selected={selected} onClick={handleClick}>
      <Icon size={26} />
      <Label>{label}</Label>
    </Wrapper>
  )
}

export default CategoryBox

const Wrapper = styled.div<{selected?: boolean}>`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  gap: 12px;
  padding: 12px;
  cursor: pointer;
  color: ${props => (props.selected ? COLORS.text : COLORS.textBlur)};
  border-bottom: 3px solid;
  border-bottom-color: ${props =>
    props.selected ? COLORS.text : 'transparent'};
  transition: all 0.25s linear;

  &:hover {
    color: ${COLORS.text};
    border-bottom-color: ${COLORS.text};
  }
`

const Label = styled.p`
  font-weight: bold;
`

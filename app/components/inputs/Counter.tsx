'use client'

import {COLORS} from '@/app/constants'
import React, {useCallback} from 'react'
import {AiOutlineMinus, AiOutlinePlus} from 'react-icons/ai'
import {styled} from 'styled-components'

interface CounterProps {
  title: string
  subtitle: string
  value: number
  onChange: (value: number) => void
}

const Counter: React.FC<CounterProps> = ({
  title,
  subtitle,
  value,
  onChange,
}) => {
  const onAdd = useCallback(() => {
    onChange(value + 1)
  }, [onChange, value])

  const onReduce = useCallback(() => {
    if (value === 1) return
    onChange(value - 1)
  }, [onChange, value])

  return (
    <Wrapper>
      <LeftGroup>
        <Title>{title}</Title>
        <Subtitle>{subtitle}</Subtitle>
      </LeftGroup>
      <RightGroup>
        <StyledBtn onClick={onReduce}>
          <AiOutlineMinus />
        </StyledBtn>
        <StyledValue>{value}</StyledValue>
        <StyledBtn onClick={onAdd}>
          <AiOutlinePlus />
        </StyledBtn>
      </RightGroup>
    </Wrapper>
  )
}

export default Counter

const Wrapper = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  margin: 24px 0;
`

const LeftGroup = styled.div`
  display: flex;
  flex-direction: column;
`

const Title = styled.div`
  font-weight: bold;
  margin-bottom: 8px;
  color: ${COLORS.text};
`

const Subtitle = styled.div`
  color: ${COLORS.textBlur};
`

const RightGroup = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
`

const StyledBtn = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  width: 40px;
  height: 40px;
  border-radius: 100px;
  border: 2px solid ${COLORS.gray};
  transition: all 0.25s linear;
  cursor: pointer;

  &:hover {
    opacity: 0.8;
  }
`

const StyledValue = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  width: 30px;
  font-size: 18px;
  font-weight: bold;
  color: ${COLORS.text};
  margin: 0 8px;
  user-select: none;
`

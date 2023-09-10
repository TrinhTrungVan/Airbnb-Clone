'use client'

import Image from 'next/image'
import React, {CSSProperties, useCallback, useState} from 'react'
import styled from 'styled-components'
import {TbChevronLeft, TbChevronRight} from 'react-icons/tb'
import {COLORS} from '../constants'

interface SliderProps {
  data: string[]
}

const Slider: React.FC<SliderProps> = ({data: images}) => {
  const [index, setIndex] = useState(0)

  const handleNext = useCallback(
    (e: React.MouseEvent<HTMLDivElement>) => {
      e.stopPropagation()

      if (index === images.length - 1) {
        return
      }
      setIndex(value => value + 1)
    },
    [index, images],
  )

  const handleBack = useCallback(
    (e: React.MouseEvent<HTMLDivElement>) => {
      e.stopPropagation()

      if (index === 0) {
        return
      }

      setIndex(value => value - 1)
    },
    [index],
  )

  return (
    <Wrapper>
      <Content index={index}>
        {images.map((item, index) => {
          return (
            <Item key={item}>
              <Image
                fill
                src={images[index]}
                alt="Listing"
                style={imageStyle}
              />
            </Item>
          )
        })}
      </Content>
      <ButtonGroup>
        <StyledButton
          onClick={handleBack}
          style={{opacity: index === 0 ? 0 : 1}}>
          <TbChevronLeft size={24} />
        </StyledButton>
        <StyledButton
          onClick={handleNext}
          style={{
            opacity: index === images.length - 1 ? 0 : 1,
          }}>
          <TbChevronRight size={24} />
        </StyledButton>
      </ButtonGroup>
      <DotGroup>
        {images.map((item, idx) => {
          return <Dot key={item} active={index === idx} />
        })}
      </DotGroup>
    </Wrapper>
  )
}

export default Slider

const ButtonGroup = styled.div`
  width: 90%;
  position: absolute;
  top: 45%;
  left: 5%;
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  transition: opacity 0.25s ease-in;
  opacity: 0;
`

const Wrapper = styled.div`
  width: 100%;
  height: 100%;
  border-radius: 16px;
  overflow: hidden;
  position: relative;

  &:hover ${ButtonGroup} {
    opacity: 1;
  }
`

const Content = styled.div<{index: number}>`
  display: flex;
  flex-direction: row;
  width: 100%;
  height: 100%;
  transform: ${props => `translateX(-${100 * props.index}%)`};
  transition: transform 0.25s ease-in;
`

const Item = styled.div`
  width: 100%;
  height: 100%;
  min-width: 100%;
  position: relative;
`

const imageStyle: CSSProperties = {
  objectFit: 'cover',
}

const StyledButton = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  background-color: white;
  color: ${COLORS.text};
  width: 36px;
  height: 36px;
  border-radius: 100%;
  box-shadow: rgba(0, 0, 0, 0.24) 0px 3px 8px;
  transition: transform 0.15s linear;

  &:hover {
    transform: scale(1.05);
  }

  &:active {
    transform: scale(0.95);
  }
`

const DotGroup = styled.div`
  position: absolute;
  bottom: 5%;
  left: 40%;
  height: 5px;
  width: 30%;
  display: flex;
  justify-content: space-around;
  align-items: center;
`

const Dot = styled.div<{active: boolean}>`
  background-color: ${COLORS.white};
  width: ${props => (props.active ? '16px' : '8px')};
  height: 8px;
  border-radius: 4px;
  transition: width 0.15s linear;
`

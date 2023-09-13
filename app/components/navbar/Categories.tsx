'use client'

import React, {useEffect, useRef} from 'react'
import Container from '../Container'
import {styled} from 'styled-components'

import {TbBeach, TbMountain, TbPool} from 'react-icons/tb'
import {
  GiBarn,
  GiBoatFishing,
  GiCactus,
  GiCastle,
  GiCaveEntrance,
  GiForestCamp,
  GiIsland,
  GiWindmill,
} from 'react-icons/gi'
import {FaSkiing} from 'react-icons/fa'
import {BsSnow} from 'react-icons/bs'
import {IoDiamond, IoGitMerge} from 'react-icons/io5'
import {MdOutlineVilla} from 'react-icons/md'
import CategoryBox from '../CategoryBox'
import {usePathname, useSearchParams} from 'next/navigation'
import {COLORS, DEVICES, SIZES} from '@/app/constants'

export const CATEGORIES = [
  {
    label: 'Beach',
    icon: TbBeach,
    description: 'This property is close to the beach!',
  },
  {
    label: 'Windmills',
    icon: GiWindmill,
    description: 'This property is has windmills!',
  },
  {
    label: 'Modern',
    icon: MdOutlineVilla,
    description: 'This property is modern!',
  },
  {
    label: 'Countryside',
    icon: TbMountain,
    description: 'This property is in the countryside!',
  },
  {
    label: 'Pools',
    icon: TbPool,
    description: 'This is property has a beautiful pool!',
  },
  {
    label: 'Islands',
    icon: GiIsland,
    description: 'This property is on an island!',
  },
  {
    label: 'Lake',
    icon: GiBoatFishing,
    description: 'This property is near a lake!',
  },
  {
    label: 'Skiing',
    icon: FaSkiing,
    description: 'This property has skiing activies!',
  },
  {
    label: 'Castles',
    icon: GiCastle,
    description: 'This property is an ancient castle!',
  },
  {
    label: 'Caves',
    icon: GiCaveEntrance,
    description: 'This property is in a spooky cave!',
  },
  {
    label: 'Camping',
    icon: GiForestCamp,
    description: 'This property offers camping activities!',
  },
  {
    label: 'Arctic',
    icon: BsSnow,
    description: 'This property is in arctic environment!',
  },
  {
    label: 'Desert',
    icon: GiCactus,
    description: 'This property is in the desert!',
  },
  {
    label: 'Barns',
    icon: GiBarn,
    description: 'This property is in a barn!',
  },
  {
    label: 'Lux',
    icon: IoDiamond,
    description: 'This property is brand new and luxurious!',
  },
]

const Categories = () => {
  const params = useSearchParams()
  const category = params?.get('category')

  const pathname = usePathname()

  const isMainPage = pathname === '/'

  const categoryRef = useRef<HTMLDivElement>(null)
  useEffect(() => {
    const scrollCategories = () => {
      if (
        document.body.scrollTop > 60 ||
        document.documentElement.scrollTop > 60
      ) {
        categoryRef.current?.style.setProperty(
          'box-shadow',
          'rgba(0, 0, 0, 0.1) 0px 10px 15px -3px',
        )
        categoryRef.current?.style.setProperty('height', '80px')
      } else {
        categoryRef.current?.style.removeProperty('box-shadow')
        categoryRef.current?.style.setProperty('height', '100px')
      }
    }
    window.addEventListener('scroll', scrollCategories)
    return () => {
      window.removeEventListener('scroll', scrollCategories)
    }
  }, [])

  if (!isMainPage) return null

  return (
    <Wrapper>
      <StyledDiv ref={categoryRef}>
        <Content>
          {CATEGORIES.map(item => (
            <CategoryBox
              key={item.label}
              label={item.label}
              selected={category === item.label}
              icon={item.icon}
            />
          ))}
        </Content>
      </StyledDiv>
    </Wrapper>
  )
}

export default Categories

const Wrapper = styled.div`
  width: 100%;
  background-color: ${COLORS.white};
  margin-top: 2px;
`

const StyledDiv = styled.div`
  display: flex;
  flex: 1;
  height: 100px;
  align-items: center;
  justify-content: center;
  padding: 0 80px;
  padding-bottom: 8px;
  transition: all 0.15s linear;

  @media ${DEVICES.tablet} {
    padding: 0 20px;
  }
`

const Content = styled.div`
  width: 100%;
  height: 100%;
  max-width: ${SIZES.desktop};
  margin: auto;
  display: flex;
  flex: 1;
  flex-direction: row;
  gap: 12px;
  justify-content: space-between;
  align-items: center;
  overflow-x: auto;
`

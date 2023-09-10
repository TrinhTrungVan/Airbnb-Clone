'use client'

import {useRouter} from 'next/navigation'
import React from 'react'
import {styled} from 'styled-components'
import Heading from './Heading'
import Button from './Button'

interface EmptyStateProps {
  title?: string
  subtitle?: string
  showReset?: boolean
}

const EmptyState: React.FC<EmptyStateProps> = ({
  title = 'No exact matches',
  subtitle = 'Try changing or removing some of your filters',
  showReset,
}) => {
  const router = useRouter()

  return (
    <Wrapper>
      <Heading title={title} subtitle={subtitle} center />
      <StyledDiv>
        {showReset && (
          <Button
            outline
            label="Remove all filters"
            onClick={() => router.push('/')}
          />
        )}
      </StyledDiv>
    </Wrapper>
  )
}

export default EmptyState

const Wrapper = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
  padding-top: 300px;
`

const StyledDiv = styled.div`
  margin-top: 24px;
`

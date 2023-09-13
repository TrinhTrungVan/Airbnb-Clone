'use client'

import {COLORS} from '@/app/constants'
import React, {useState, useEffect, useCallback} from 'react'
import {styled} from 'styled-components'
import {IoMdClose} from 'react-icons/io'
import Button from '../Button'

interface ModalProps {
  isOpen?: boolean
  onClose: () => void
  onSubmit: () => void
  title?: string
  body?: React.ReactElement
  footer?: React.ReactElement
  actionLabel: string
  disabled?: boolean
  secondaryAction?: () => void
  secondaryActionLabel?: string
}

const Modal: React.FC<ModalProps> = ({
  isOpen,
  onClose,
  onSubmit,
  title,
  body,
  footer,
  disabled,
  actionLabel,
  secondaryAction,
  secondaryActionLabel,
}) => {
  const [showModal, setShowModal] = useState(isOpen)

  useEffect(() => {
    setShowModal(isOpen)
  }, [isOpen])

  const handleClose = useCallback(() => {
    if (disabled) {
      return
    }
    setShowModal(false)
    // Delay to add animation
    setTimeout(() => {
      onClose()
    }, 250)
  }, [disabled, onClose])

  const handleSubmit = useCallback(() => {
    if (disabled) {
      return
    }
    onSubmit()
  }, [disabled, onSubmit])

  const handleSecondaryAction = useCallback(() => {
    if (disabled || !secondaryAction) {
      return
    }
    secondaryAction()
  }, [disabled, secondaryAction])

  if (!isOpen) {
    return null
  }

  return (
    <Backdrop>
      <Wrapper showModal={showModal}>
        <Header>
          <button onClick={handleClose}>
            <IoMdClose size={18} />
          </button>
          <Title>{title}</Title>
        </Header>
        <Content>
          <Body>{body}</Body>
          <ButtonGroup>
            {secondaryActionLabel && secondaryAction && (
              <Button
                outline
                label={secondaryActionLabel}
                onClick={handleSecondaryAction}
              />
            )}
            <Button label={actionLabel} onClick={handleSubmit} />
          </ButtonGroup>
          <Footer>{footer}</Footer>
        </Content>
      </Wrapper>
    </Backdrop>
  )
}

export default Modal

const Backdrop = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  width: 100%;
  height: 100%;
  overflow-x: hidden;
  overflow-y: auto;
  outline: none;
  position: fixed;
  z-index: 1000;
  overflow: hidden;
  background-color: ${COLORS.backdrop};
`

const Wrapper = styled.div<{showModal: any}>`
  background-color: ${COLORS.white};
  width: 100%;
  max-width: 568px;
  margin: 32px 20px;
  border-radius: 12px;
  opacity: ${props => (props.showModal ? 1 : 0)};
  translate: 0 ${props => (props.showModal ? 0 : '100%')};
  transition: all 0.25s linear;
  overflow: hidden;
  position: relative;
`

const Header = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  width: 100%;
  height: 64px;
  border-bottom: 1px solid ${COLORS.gray};
  position: fixed;
  z-index: 1000;
  background-color: ${COLORS.white};

  & > button {
    border: none;
    outline: none;
    background-color: transparent;
    display: flex;
    justify-content: center;
    align-items: center;
    width: 32px;
    height: 32px;
    border-radius: 50%;
    transition: background-color 0.25s linear;
    position: absolute;
    left: 16px;
    cursor: pointer;

    &:hover {
      background-color: ${COLORS.backgroundHover};
    }
  }
`

const Title = styled.div`
  font-size: 16px;
  font-weight: bold;
  cursor: default;
`

const Content = styled.div`
  margin-top: 64px;
  max-height: 80vh;
  overflow-y: auto;
`

const Body = styled.div`
  margin: 16px 0;
  padding: 16px 24px;
`

const ButtonGroup = styled.div`
  display: flex;
  flex-direction: row;
  gap: 24px;
  padding: 16px 24px;
`

const Footer = styled.div`
  padding: 16px 24px;
`

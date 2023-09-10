'use client'

import {COLORS} from '@/app/constants'
import React from 'react'
import {UseFormRegister, FieldValues, FieldErrors} from 'react-hook-form'
import {BiDollar} from 'react-icons/bi'
import {styled} from 'styled-components'

interface InputProps {
  id: string
  label: string
  type?: string
  disabled?: boolean
  formatPrice?: boolean
  required?: boolean
  register: UseFormRegister<FieldValues>
  errors: FieldErrors
}

const Input: React.FC<InputProps> = ({
  id,
  label,
  type = 'text',
  disabled,
  formatPrice,
  required,
  register,
  errors,
}) => {
  return (
    <Wrapper>
      {formatPrice && (
        <FormatPrice>
          <BiDollar size={24} />
        </FormatPrice>
      )}
      <StyledInput
        id={id}
        disabled={disabled}
        {...register(id, {required})}
        type={type}
        placeholder=" "
        error={errors[id]}
        formatPrice={formatPrice}
      />
      <StyledLabel error={errors[id]} formatPrice={formatPrice}>
        {label}
      </StyledLabel>
    </Wrapper>
  )
}

export default Input

const Wrapper = styled.div`
  display: flex;
  flex: 1;
  position: relative;
`

const StyledInput = styled.input<{disabled: any; error: any; formatPrice: any}>`
  width: 100%;
  padding: 16px;
  padding-top: 20px;
  padding-left: ${props => (props.formatPrice ? '36px' : '16px')};
  font-size: 16px;
  border-radius: 8px;
  overflow: hidden;
  outline: none;
  border-width: 2px;
  border-style: solid;
  border-color: ${props => (props.error ? COLORS.main : COLORS.gray)};
  color: ${props => (props.error ? COLORS.main : COLORS.text)};
  transition: all 0.2s linear;

  &:disabled {
    opacity: 0.7;
    cursor: not-allowed;
  }

  &:focus {
    border-color: ${props => (props.error ? COLORS.main : COLORS.black)};
  }

  &:focus ~ label,
  &:not(:placeholder-shown) ~ label {
    top: 8px;
    font-size: 12px;
    color: ${props => (props.error ? COLORS.main : COLORS.text)};
  }
`

const StyledLabel = styled.label<{error: any; formatPrice: any}>`
  position: absolute;
  font-weight: bold;
  top: 22px;
  left: ${props => (props.formatPrice ? '36px' : '16px')};
  color: ${props => (props.error ? COLORS.main : COLORS.textBlur)};
  transition: all 0.15s cubic-bezier(0.075, 0.82, 0.165, 1);
  pointer-events: none;
`

const FormatPrice = styled.div`
  position: absolute;
  top: 16px;
  left: 10px;
`

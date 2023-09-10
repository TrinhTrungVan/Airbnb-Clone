'use client'

import React, {useState} from 'react'
import {FieldValues, SubmitHandler, useForm} from 'react-hook-form'
import Modal from './Modal'
import useRegisterModal from '@/app/hooks/useRegisterModal'
import axios from 'axios'
import Heading from '../Heading'
import Input from '../inputs/Input'
import {toast} from 'react-hot-toast'
import Line from '../Line'
import Button from '../Button'
import {FaFacebookSquare} from 'react-icons/fa'
import {FcGoogle} from 'react-icons/fc'
import {AiFillGithub} from 'react-icons/ai'
import {styled} from 'styled-components'
import useLoginModal from '@/app/hooks/useLoginModal'
import {COLORS} from '@/app/constants'
import {signIn} from 'next-auth/react'

const RegisterModal = () => {
  const registerModal = useRegisterModal()
  const loginModal = useLoginModal()
  const [isLoading, setIsLoading] = useState(false)

  const {
    register,
    handleSubmit,
    formState: {errors},
  } = useForm<FieldValues>({
    defaultValues: {
      name: '',
      email: '',
      password: '',
    },
  })

  const onSubmit: SubmitHandler<FieldValues> = data => {
    setIsLoading(true)

    console.log('Submit', data)

    axios
      .post('/api/register', data)
      .then(() => {
        registerModal.onClose()
        loginModal.onOpen()
      })
      .catch(error => {
        toast.error('Something went wrong.')
      })
      .finally(() => setIsLoading(false))
  }

  const handleOpenLoginModal = () => {
    registerModal.onClose()
    loginModal.onOpen()
  }

  const bodyContent = (
    <div>
      <div style={{marginBottom: 24}}>
        <Heading title="Welcome to Airbnb" subtitle="Create an account!" />
      </div>
      <StyledBody>
        <Input
          id="email"
          label="Email"
          disabled={isLoading}
          register={register}
          errors={errors}
          required
        />
        <Input
          id="name"
          label="Name"
          disabled={isLoading}
          register={register}
          errors={errors}
          required
        />
        <Input
          id="password"
          label="Password"
          type="password"
          disabled={isLoading}
          register={register}
          errors={errors}
          required
        />
      </StyledBody>
    </div>
  )

  const footerContent = (
    <div>
      <div style={{marginBottom: 36}}>
        <Line label="Or" />
      </div>
      <StyledFooter>
        <Button
          outline
          label="Continue with Facebook"
          onClick={() => signIn('facebook')}
          icon={FaFacebookSquare}
        />
        <Button
          outline
          label="Continue with Google"
          onClick={() => signIn('google')}
          icon={FcGoogle}
        />
        <Button
          outline
          label="Continue with Github"
          onClick={() => signIn('github')}
          icon={AiFillGithub}
        />
      </StyledFooter>
      <StyledDiv>
        <p>
          Already an account?
          <StyledSpan onClick={handleOpenLoginModal}>Log in</StyledSpan>
        </p>
      </StyledDiv>
    </div>
  )

  return (
    <Modal
      disabled={isLoading}
      isOpen={registerModal.isOpen}
      title="Register"
      actionLabel="Continue"
      onClose={registerModal.onClose}
      onSubmit={handleSubmit(onSubmit)}
      body={bodyContent}
      footer={footerContent}
    />
  )
}

export default RegisterModal

const StyledFooter = styled.div`
  display: flex;
  flex-direction: column;
  gap: 16px;
`

const StyledBody = styled.div`
  display: flex;
  flex-direction: column;
  gap: 16px;
`

const StyledDiv = styled.div`
  text-align: center;
  margin: 32px 0 16px;
`

const StyledSpan = styled.span`
  font-weight: bold;
  margin-left: 8px;
  cursor: pointer;

  &:hover {
    text-decoration: underline;
  }
`

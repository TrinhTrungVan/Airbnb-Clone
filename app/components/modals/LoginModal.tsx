'use client'

import React, {useState} from 'react'
import {FieldValues, SubmitHandler, useForm} from 'react-hook-form'
import {signIn} from 'next-auth/react'
import Modal from './Modal'
import useRegisterModal from '@/app/hooks/useRegisterModal'
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
import {useRouter} from 'next/navigation'

const LoginModal = () => {
  const router = useRouter()
  const registerModal = useRegisterModal()
  const loginModal = useLoginModal()
  const [isLoading, setIsLoading] = useState(false)

  const {
    register,
    handleSubmit,
    formState: {errors},
  } = useForm<FieldValues>({
    defaultValues: {
      email: '',
      password: '',
    },
  })

  const onSubmit: SubmitHandler<FieldValues> = data => {
    setIsLoading(true)

    signIn('credentials', {
      ...data,
      redirect: false,
    }).then(callback => {
      setIsLoading(false)
      if (callback?.ok) {
        toast.success('Logged in!')
        router.refresh()
        loginModal.onClose()
      }

      if (callback?.error) {
        toast.error(callback.error)
      }
    })
  }

  const handleOpenRegisterModal = () => {
    loginModal.onClose()
    registerModal.onOpen()
  }

  const bodyContent = (
    <div>
      <div style={{marginBottom: 24}}>
        <Heading title="Welcome back" subtitle="Login to your account!" />
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
        <StyledDiv>
          <p>
            First time using Airbnb?
            <StyledSpan onClick={handleOpenRegisterModal}>
              Create an account
            </StyledSpan>
          </p>
        </StyledDiv>
      </StyledFooter>
    </div>
  )

  return (
    <Modal
      disabled={isLoading}
      isOpen={loginModal.isOpen}
      title="Login"
      actionLabel="Continue"
      onClose={loginModal.onClose}
      onSubmit={handleSubmit(onSubmit)}
      body={bodyContent}
      footer={footerContent}
    />
  )
}

export default LoginModal

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
  margin: 16px 0;
`

const StyledSpan = styled.span`
  font-weight: bold;
  margin-left: 8px;
  cursor: pointer;

  &:hover {
    text-decoration: underline;
  }
`

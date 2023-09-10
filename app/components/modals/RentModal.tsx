'use client'

import React, {useMemo, useState} from 'react'
import {FieldValues, SubmitHandler, useForm} from 'react-hook-form'
import useRentModal from '@/app/hooks/useRentModal'
import Modal from './Modal'
import Heading from '../Heading'
import {CATEGORIES} from '../navbar/Categories'
import CategoryInput from '../inputs/CategoryInput'
import {styled} from 'styled-components'
import CountrySelect from '../inputs/CountrySelect'
import Map from '../Map'
import dynamic from 'next/dynamic'
import Counter from '../inputs/Counter'
import Line from '../Line'
import ImageUpload from '../inputs/ImageUpload'
import Input from '../inputs/Input'
import {useRouter} from 'next/navigation'
import axios from 'axios'
import {toast} from 'react-hot-toast'

enum STEPS {
  CATEGORY = 0,
  LOCATION = 1,
  INFO = 2,
  IMAGES = 3,
  DESCRIPTION = 4,
  PRICE = 5,
}

const RentModal = () => {
  const router = useRouter()
  const rentModal = useRentModal()

  const [step, setStep] = useState(STEPS.CATEGORY)
  const [isLoading, setIsLoading] = useState(false)

  const {
    register,
    handleSubmit,
    setValue,
    watch,
    formState: {errors},
    reset,
  } = useForm<FieldValues>({
    defaultValues: {
      category: '',
      location: null,
      guestCount: 1,
      roomCount: 1,
      bathroomCount: 1,
      images: [],
      price: 1,
      title: '',
      description: '',
    },
  })

  const category = watch('category')
  const location = watch('location')
  const guestCount = watch('guestCount')
  const roomCount = watch('roomCount')
  const bathroomCount = watch('bathroomCount')
  const images = watch('images')

  const Map = useMemo(
    () =>
      dynamic(() => import('../Map'), {
        ssr: false,
      }),
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [location],
  )

  const setCustomValue = (id: string, value: any) => {
    setValue(id, value, {
      shouldDirty: true,
      shouldTouch: true,
      shouldValidate: true,
    })
  }

  const onBack = () => {
    setStep(value => value - 1)
  }

  const onNext = () => {
    setStep(value => value + 1)
  }

  const onSubmit: SubmitHandler<FieldValues> = data => {
    if (step !== STEPS.PRICE) {
      return onNext()
    }

    setIsLoading(true)

    axios
      .post('/api/listings', data)
      .then(() => {
        toast.success('Listing created!')
        router.refresh()
        reset()
        setStep(STEPS.CATEGORY)
        rentModal.onClose()
      })
      .catch(() => {
        toast.error('Something went wrong.')
      })
      .finally(() => {
        setIsLoading(false)
      })
  }

  const actionLabel = useMemo(() => {
    if (step === STEPS.PRICE) {
      return 'Create'
    }

    return 'Next'
  }, [step])

  const secondaryActionLabel = useMemo(() => {
    if (step === STEPS.CATEGORY) {
      return undefined
    }

    return 'Back'
  }, [step])

  let bodyContent = (
    <div>
      <StyledHeading>
        <Heading
          title="Which of these best describes your place?"
          subtitle="Pick a category"
        />
      </StyledHeading>
      <CategoryContent>
        {CATEGORIES.map(item => (
          <CategoryInput
            icon={item.icon}
            label={item.label}
            selected={category === item.label}
            onClick={category => setCustomValue('category', category)}
            key={item.label}
          />
        ))}
      </CategoryContent>
    </div>
  )

  if (step === STEPS.LOCATION) {
    bodyContent = (
      <div>
        <StyledHeading>
          <Heading
            title="Where is your place located?"
            subtitle="Help guests find you!"
          />
        </StyledHeading>
        <CountrySelect
          value={location}
          onChange={value => setCustomValue('location', value)}
        />
        <Map center={location?.latlng} />
      </div>
    )
  }

  if (step === STEPS.INFO) {
    bodyContent = (
      <div>
        <StyledHeading>
          <Heading
            title="Share some basics about your place"
            subtitle="What amenities do you have?"
          />
        </StyledHeading>
        <Counter
          title="Guests"
          subtitle="How many guests do you allow?"
          value={guestCount}
          onChange={value => setCustomValue('guestCount', value)}
        />
        <Line />
        <Counter
          title="Rooms"
          subtitle="How many rooms do you have?"
          value={roomCount}
          onChange={value => setCustomValue('roomCount', value)}
        />
        <Line />
        <Counter
          title="Bathrooms"
          subtitle="How many bathrooms do you have?"
          value={bathroomCount}
          onChange={value => setCustomValue('bathroomCount', value)}
        />
      </div>
    )
  }

  if (step === STEPS.IMAGES) {
    bodyContent = (
      <div>
        <StyledHeading>
          <Heading
            title="Add photos of your place"
            subtitle="Show guests what your place look like!"
          />
        </StyledHeading>
        <ImageUpload
          value={images}
          onChange={value => setCustomValue('images', value)}
        />
      </div>
    )
  }

  if (step === STEPS.DESCRIPTION) {
    bodyContent = (
      <div>
        <StyledHeading>
          <Heading
            title="How would you describe your place?"
            subtitle="Short and sweet works best!"
          />
        </StyledHeading>
        <div style={{display: 'flex', flexDirection: 'column', gap: 16}}>
          <Input
            id="title"
            label="Title"
            disabled={isLoading}
            register={register}
            errors={errors}
            required
          />
          <Input
            id="description"
            label="Description"
            disabled={isLoading}
            register={register}
            errors={errors}
            required
          />
        </div>
      </div>
    )
  }

  if (step === STEPS.PRICE) {
    bodyContent = (
      <div>
        <StyledHeading>
          <Heading
            title="Now, set your price"
            subtitle="How much do you charge per night?"
          />
        </StyledHeading>
        <Input
          id="price"
          label="Price"
          disabled={isLoading}
          register={register}
          errors={errors}
          formatPrice
          required
        />
      </div>
    )
  }

  return (
    <Modal
      isOpen={rentModal.isOpen}
      title="Airbnb your home!"
      onClose={rentModal.onClose}
      onSubmit={handleSubmit(onSubmit)}
      actionLabel={actionLabel}
      secondaryActionLabel={secondaryActionLabel}
      secondaryAction={step === STEPS.CATEGORY ? undefined : onBack}
      body={bodyContent}
    />
  )
}

export default RentModal

const StyledHeading = styled.div`
  margin-bottom: 36px;
`

const CategoryContent = styled.div`
  display: grid;
  grid-template-columns: auto auto;
  gap: 16px;
  max-height: 50vh;
  overflow-y: auto;
  padding-right: 4px;
`

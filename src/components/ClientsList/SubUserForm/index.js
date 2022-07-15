import React, { useState, useRef, useEffect } from 'react'
import { Alert, Button, Input } from '../../Shared'
import { useForm } from 'react-hook-form'
import BisError from '@meronex/icons/bi/BisError'
import { doPost } from '../../../services/http-client'

import {
  FormContainer,
  FormController,
  ValidationError,
  CompanyLogoContainer,
  CompanyLogoWrapper,
  ChooseFileContainer
} from './styles'

export const SubUserForm = (props) => {
  const { register, handleSubmit, formState: { errors }  } = useForm()
  const inputRef = useRef()
  const [photoState, setPhotoState] = useState(null)
  const [compoanyLogoData, setCompanyLogoData] = useState(null)
  const [actionState, setActionState] = useState({ loading: false, error: null })
  const [alertState, setAlertState] = useState({ open: false, content: [] })

  const handleFiles = (e) => {
    e.preventDefault()
    e.stopPropagation()
    let files = e.target.files
    if (files.length === 1) {
      const type = files[0].type.split('/')[0]
      if (type === 'image') {
        const reader = new window.FileReader()
        reader.readAsDataURL(files[0])
        reader.onload = () => {
          setPhotoState(reader.result)
          setCompanyLogoData(reader.result.replace(/^data:image\/[a-z]+;base64,/, ""))
        }
      }
    }
  }

  const onSubmit = async (formState) => {
    try {
      setActionState({ ...actionState, loading: true })
      const payload = {...formState}
      if (compoanyLogoData) {
        payload['company-logo'] = compoanyLogoData
      }
      const response = await doPost('partner/users/create-user', payload)
      if (response?.data?.error) {
        throw response.error
      }
      setActionState({ loading: false, error: null })
      props.onAddUserSuccess && props.onAddUserSuccess()
    } catch (error) {
      setActionState({
        loading: false,
        error: error.message
      })
    }
  }

  useEffect(() => {
    if (actionState.error) {
      setAlertState({ open: true, content: actionState.error })
    }
  }, [actionState.error])


  return (
    <FormContainer onSubmit={handleSubmit(onSubmit)}>
      <h2>Add new user</h2>
      <FormController>
        <label>Email</label>
          <Input
            type='email'
            {
              ...register('email',
              {
                required: { value: true, message: 'The field email is required' },
                pattern: {
                  value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                  message: 'Invalid email'
                }
              })
            }
          />
        {errors.email?.message && <ValidationError><BisError /> {errors.email?.message}</ValidationError>}
      </FormController>
      <FormController>
        <label>Phone number</label>
          <Input
            type='text'
            {
              ...register('phone-number',
              {
                required: { value: true, message: 'The field phone number is required' },
                minLength: { value: 10, message: 'Phone number must contain 10 digits' },
                maxLength: { value: 10, message: 'Invalid Phone number' },
              })
            }
          />
        {errors['phone-number']?.message && <ValidationError><BisError /> {errors['phone-number']?.message}</ValidationError>}
      </FormController>
      <FormController>
        <label>Full name</label>
          <Input
            type='text'
            {
              ...register('full-name',
              {
                required: { value: true, message: 'The field full name is required' },
              })
            }
          />
        {errors['full-name']?.message && <ValidationError><BisError /> {errors['full-name']?.message}</ValidationError>}
      </FormController>
      <FormController>
        <label>Company name</label>
          <Input
            type='text'
            {
              ...register('company-name',
              {
                required: { value: true, message: 'The field company name is required' },
              })
            }
          />
        {errors['company-name']?.message && <ValidationError><BisError /> {errors['company-name']?.message}</ValidationError>}
      </FormController>
      <FormController>
        <label>Company url</label>
          <Input
            type='text'
            {
              ...register('company-url',
              {
                required: { value: true, message: 'The field company url is required' },
              })
            }
          />
        {errors['company-url']?.message && <ValidationError><BisError /> {errors['company-url']?.message}</ValidationError>}
      </FormController>
      <CompanyLogoContainer>
        <div>
          <CompanyLogoWrapper>
            {photoState && <img src={photoState} alt='' />}
          </CompanyLogoWrapper>
          <p>Company logo</p>
        </div>
        <ChooseFileContainer>
          <input
            ref={inputRef}
            type='file'
            accept='image/png, image/jpeg, image/jpg'
            onChange={handleFiles}
          />
        </ChooseFileContainer>
      </CompanyLogoContainer>
      <Button
        type='submit'
        color='primary'
      >
        {actionState.loading ? 'Loading...' : 'Add'}
      </Button>

      <Alert
        title='Error'
        width='500px'
        content={alertState.content}
        acceptText={'Accept'}
        open={alertState.open}
        onClose={() => setAlertState({ open: false, content: [] })}
        onAccept={() => setAlertState({ open: false, content: [] })}
        closeOnBackdrop={false}
      />
    </FormContainer>
  )
}

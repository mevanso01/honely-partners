import React from 'react'
import { Button, Input } from '../../Shared'
import { useForm } from 'react-hook-form'
import { useToast, ToastType } from '../../../contexts/ToastContext'
import BisError from '@meronex/icons/bi/BisError'

import {
  Container,
  FormController,
  ValidationError,
  ButtonGroup
} from './styles'

import config from '../../../aws-exports'
import Amplify, { Auth } from 'aws-amplify'
Amplify.configure(config)

export const ChangePassword = (props) => {
  const {
    setActionState,
    onClose
  } = props

  const [, { showToast }] = useToast()
  const { register, handleSubmit, formState: { errors }, watch  } = useForm()
  const newPassword = watch('new_password', '')

  const onSubmit = async (formState) => {
    try {
      showToast(ToastType.Info, 'Loading')
      setActionState({ loading: true, error: null })
      const user = await Auth.currentAuthenticatedUser()
      await Auth.changePassword(user, formState.current_password, formState.new_password)
      showToast(ToastType.Success, 'Password Changed.')
      setActionState({ loading: false, error: null })
      onClose()
    } catch (err) {
      let errorMessage = ''
      if (err.code === 'LimitExceededException') {
        errorMessage = "Password Limit Change Exceeded. Please try again later."
      }
      else if (err.code === 'NotAuthorizedException') {
        errorMessage = "Incorrect Current password provided."
      }
      else if (err.code === "InvalidPasswordException") {
        errorMessage = err.message
      }
      else {
        errorMessage = "Password Change Failed. Please check your network connection and try again"
      }
      setActionState({ loading: false, error: errorMessage })
    }
  }

  return (
    <Container onSubmit={handleSubmit(onSubmit)}>
      <h1>Change Password</h1>
      <FormController>
        <label>Old password</label>
        <Input
          type='password'
          {
            ...register('current_password',
            {
              required: { value: true, message: 'The current password is required' },
            })
          }
        />
        {errors.current_password?.message && <ValidationError><BisError /> {errors.current_password?.message}</ValidationError>}
      </FormController>
      <FormController>
        <label>Create new password</label>
        <Input
          type='password'
          {
            ...register('new_password',
            {
              required: { value: true, message: 'The new password is required' },
            })
          }
        />
        {errors.new_password?.message && <ValidationError><BisError /> {errors.new_password?.message}</ValidationError>}
      </FormController>
      <FormController>
        <label>Confirm new Password</label>
        <Input
          type='password'
          {
            ...register('confirm_password',
            {
              required: { value: true, message: 'The confirm password is required' },
              validate: value => value === newPassword || 'The passwords do not match'
            })
          }
        />
        {errors.confirm_password?.message && <ValidationError><BisError /> {errors.confirm_password?.message}</ValidationError>}
      </FormController>
      <ButtonGroup>
        <Button
          color='primary'
          type='submit'
        >
          Submit
        </Button>
        <Button
          type='button'
          outline
          color='black'
          onClick={() => onClose()}
        >
          Cancel
        </Button>
      </ButtonGroup>
    </Container>
  )
}
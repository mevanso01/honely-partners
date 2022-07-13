import React, { useState } from 'react'
import { useDispatch } from 'react-redux'
import { useForm } from 'react-hook-form'
import { Input, Button } from '../Shared'
import BisError from '@meronex/icons/bi/BisError'
import { cognitoCompleteNewPassword } from '../../store/reducers/cognitoUser'

import {
  FormController,
  NewPasswordContainer,
  ValidationError
} from './styles'

export const NewPassword = () => {
  const [submitState, setSubmitState] = useState({ loading: false, error: null })

    // const handleChangePassword = async () => {
  //   Auth.completeNewPassword(user, 'Test$100')
  // }
  const dispatch = useDispatch()
  const { register, handleSubmit, formState: { errors }  } = useForm()
  const onSubmit = async (formState) => {
    try {
      setSubmitState({ ...submitState, loading: true })
      await dispatch(cognitoCompleteNewPassword(formState.newpassword))
      setSubmitState({ loading: false, error: null })
    } catch (error) {
      setSubmitState({ loading: false, error: [error.message] })
    }
  }

  const checkPasswordValidation = (value) => {
    if (!(/[\d]/i).test(value)) {
      return 'Password should contain at least 1 number'
    } else if (!(/[\!@#$%^&\*\(\)\_\+-]/i).test(value)) {
      return 'Password should contain at least 1 special charactor'
    } else if (!/(?=.*[A-Z])/.test(value)) {
      return 'Password should contain at least 1 uppercase character'
    } else if (!/(?=.*[a-z])/.test(value)) {
      return 'Password should contain at least 1 lowercase character'
    } else {
      return true
    }
  }

  return (
    <NewPasswordContainer onSubmit={handleSubmit(onSubmit)}>
      <FormController>
        <label>New password</label>
        <Input
          type='password'
          {
            ...register('newpassword',
            {
              required: { value: true, message: 'The field new password is required' },
              minLength: { value: 8, message: 'At least 8 characters in length' },
              validate: checkPasswordValidation
            })
          }
        />
        {errors.newpassword?.message && <ValidationError><BisError /> {errors.newpassword?.message}</ValidationError>}
      </FormController>
      <Button
        color='primary'
        type='submit'
      >
        {submitState.loading ? 'Loading...' : 'Submit'}
      </Button>
    </NewPasswordContainer>
  )
}

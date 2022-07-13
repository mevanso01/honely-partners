import React, { useEffect, useState } from 'react'
import { useDispatch } from 'react-redux'
import { cognitoSignIn } from '../../store/reducers/cognitoUser'
import { useForm } from 'react-hook-form'
import { useTheme } from 'styled-components'
import { Alert, Button, Confirm, Input, Modal } from '../Shared'
import BisError from '@meronex/icons/bi/BisError'
import { NewPassword } from './NewPassword'

import {
  Container,
  InnerContainer,
  Header,
  LogoWrapper,
  FormContainer,
  FormController,
  ValidationError
} from './styles'


export const Login = () => {
  const theme = useTheme()
  const { register, handleSubmit, formState: { errors }  } = useForm()
  const dispatch = useDispatch()

  const [loginState, setLoginState] = useState({ loading: false, error: null })
  const [alertState, setAlertState] = useState({ open: false, content: [] })
  const [confirm, setConfirm] = useState({ open: false, content: null, handleOnAccept: null })
  const [openModal, setOpenModal] = useState(false)

  const onSubmit = async (formState) => {
    try {
      setLoginState({
        ...loginState,
        loading: true
      })
      const cognitoUser = await dispatch(cognitoSignIn({ username: formState.username, password: formState.password }))
      setLoginState({
        loading: false,
        error: null
      })
      if (cognitoUser?.challengeName === 'NEW_PASSWORD_REQUIRED') {
        setConfirm({
          open: true,
          content: 'The new password is required.',
          handleOnAccept: () => {
            setConfirm({ ...confirm, open: false })
            setOpenModal(true)
          }
        })
      }
    } catch (error) {
      setLoginState({
        loading: false,
        error: [error.message]
      })
    }
  }

  useEffect(() => {
    if (loginState.error) {
      setAlertState({
        open: true,
        content: loginState.error
      })
    }
  }, [loginState.error])

  return (
    <Container>
      <InnerContainer>
        <Header>
          <LogoWrapper>
            <img src={theme.images.logo} alt='logo' />
            <span>Partners</span>
          </LogoWrapper>
        </Header>
        <FormContainer onSubmit={handleSubmit(onSubmit)}>
          <h1>Login</h1>
          <FormController>
            <label>Username</label>
            <Input
              type='text'
              {
                ...register('username',
                {
                  required: { value: true, message: 'The field username is required' },
                })
              }
            />
            {errors.username?.message && <ValidationError><BisError /> {errors.username?.message}</ValidationError>}
          </FormController>
          <FormController>
            <label>Password</label>
            <Input
              type='password'
              {
                ...register('password',
                {
                  required: { value: true, message: 'The field password is required' }
                })
              }
            />
            {errors.password?.message && <ValidationError><BisError /> {errors.password?.message}</ValidationError>}
          </FormController>
          <Button
            color='primary'
            type='submit'
          >
            {loginState.loading ? 'Loading...' : 'Log in'}
          </Button>
        </FormContainer>
        {/* <button onClick={handleChangePassword}>changePassword</button> */}
        <p className='description'>For your credentials please contact Honely support</p>
      </InnerContainer>

      <Modal
        width='700px'
        open={openModal}
        onClose={() => setOpenModal(false)}
      >
        <NewPassword />
      </Modal>

      <Alert
        width='700px'
        title={'Login'}
        content={alertState.content}
        acceptText={'Accept'}
        open={alertState.open}
        onClose={() => setAlertState({ open: false, content: [] })}
        onAccept={() => setAlertState({ open: false, content: [] })}
        closeOnBackdrop={false}
      />
      <Confirm
        width='700px'
        title={'Confirm'}
        content={confirm.content}
        acceptText={'Accept'}
        open={confirm.open}
        onClose={() => setConfirm({ ...confirm, open: false })}
        onCancel={() => setConfirm({ ...confirm, open: false })}
        onAccept={confirm.handleOnAccept}
        closeOnBackdrop={false}
      />
    </Container>
  )
}

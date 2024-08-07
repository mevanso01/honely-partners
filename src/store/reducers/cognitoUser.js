import { createSlice } from '@reduxjs/toolkit'
import { doPatch } from '../../services/http-client'
import awsConfig from '../../aws-exports'
import Amplify, { Auth } from 'aws-amplify'
Amplify.configure(awsConfig)

const initialState = {
  isLoggedIn: false,
  confirmationCodeRequested: false,
  user: null,
  jwtToken: null
}

export const cognitoSignIn = (payload) => async (dispatch, getState) => {
  try {
    const username = payload.username
    const password = payload.password
    const cognitoUser = await Auth.signIn(username, password)
    if (cognitoUser?.signInUserSession?.idToken) {
      dispatch(setIsLoggedIn(true))
      dispatch(setJwtToken(cognitoUser?.signInUserSession?.idToken?.jwtToken))
    }
    dispatch(setCognitoUser(cognitoUser))
    return cognitoUser
  } catch (error) {
    return Promise.reject(error)
  }
}

export const cognitoCompleteNewPassword = (newPassword) => async (dispatch, getState) => {
  try {
    const { cognitoUser: { user } } = getState()
    const cognitoUser = await Auth.completeNewPassword(user, newPassword)
    if (cognitoUser?.signInUserSession?.idToken) {
      dispatch(setIsLoggedIn(true))
      dispatch(setJwtToken(cognitoUser?.signInUserSession?.idToken?.jwtToken))
    }
    dispatch(setCognitoUser(cognitoUser))
    await doPatch(`partner/update-partner-info`, { 'status': 'CONFIRMED' })
    return cognitoUser
  } catch (error) {
    return Promise.reject(error)
  }
}

export const cognitoSignup = (payload) => async (dispatch, getState) => {
  try {
    const username = payload.username
    const password = payload.password
    const attributes = payload.attributes
    const cognitoUser = await Auth.signUp({ username, password, attributes })
    dispatch(setCognitoUser(cognitoUser))
    return cognitoUser
  } catch (error) {
    return Promise.reject(error)
  }
}

export const cognitoResendSignUp = (username) => async (dispatch, getState) => {
  try {
    await Auth.resendSignUp(username)
    return true
  } catch (error) {
    return Promise.reject(error)
  }
}

export const cognitoConfirmSignUp = (username, code) => async (dispatch, getState) => {
  try {
    await Auth.confirmSignUp(username, code)
  } catch (error) {
    return Promise.reject(error)
  }
}

export const cognitoForgotPassword = (username) => async (dispatch, getState) => {
  try {
    await Auth.forgotPassword(username)
    return true
  } catch (error) {
    return Promise.reject(error)
  }
}

export const cognitoResetPassword = (username, code, newPassword) => async (dispatch, getState) => {
  try {
    await Auth.forgotPasswordSubmit(username, code, newPassword)
    return true
  } catch (error) {
    return Promise.reject(error)
  }
}

export const cognitoRefreshSession = () => async (dispatch, getState) => {
  try {
    const cognitoUser = await Auth.currentAuthenticatedUser()
    const currentSession = await Auth.currentSession()
    cognitoUser.refreshSession(currentSession.refreshToken, (err, session) => {
      if (!err) {
        const { idToken } = session
        dispatch(setJwtToken(idToken.jwtToken))
      } else {
        dispatch(setCognitoUser(null))
        dispatch(setIsLoggedIn(false))
      }
    })
  } catch (error) {
    return Promise.reject(error)
  }
}

export const cognitoSignOut = () => async (dispatch, getState) => {
  try {
    await Auth.signOut()
    dispatch(initCognitoUser())
    return true
  } catch (error) {
    return Promise.reject(error)
  }
}

const cognitoUserSlice = createSlice({
  name: 'cognitoUser',
  initialState,
  reducers: {
    setIsLoggedIn: (state, action) => {
      state.isLoggedIn = !!action.payload
    },
    setCognitoUser: (state, action) => {
      state.user = action.payload
    },
    setJwtToken: (state, action) => {
      state.jwtToken = action.payload
    },
    initCognitoUser: (state, action) => {
      state.user = null
      state.jwtToken = null
      state.isLoggedIn = false
    }
  },
  extraReducers: {}
})

export const { setIsLoggedIn, setCognitoUser, setJwtToken, initCognitoUser } = cognitoUserSlice.actions

export default cognitoUserSlice.reducer

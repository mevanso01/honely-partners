import React, { useState, useEffect } from 'react'
import {
  Routes,
  Route,
  Navigate
} from 'react-router-dom'
import { useSelector, useDispatch } from 'react-redux'
import { doGet } from './services/http-client'
import { setPartner } from './store/reducers/partner'
import 'react-loading-skeleton/dist/skeleton.css'
import { Alert } from './components/Shared'
import { Header } from './components/Header'

// pages
import { Login } from './pages/Login'
import { ClientsList } from './pages/ClientsList'
import { PageNotFound } from './pages/PageNotFound'

export const App = () => {
  const dispatch = useDispatch()
  const cognitoUser = useSelector(state => state.cognitoUser)
  const auth = cognitoUser?.isLoggedIn
  const [alertState, setAlertState] = useState({ open: false, content: [] })

  const getPartner = async () => {
    try {
      const response = await doGet('partner')
      if (response?.error) {
        throw response.error
      }
      dispatch(setPartner(response?.data[0]))
    } catch (error) {
      setAlertState({ open: true, content: error.message })
    }
  }
  useEffect(() => {
    if (auth) {
      getPartner()
    }
  }, [auth])

  return (
    <>
      {auth && <Header /> }
      <Routes>
        <Route path='/' element={auth ? <Navigate to='/clients' /> : <Navigate to='/login' />} />
        <Route path='/login' element={auth ? <Navigate to='/clients' /> : <Login/>}></Route>
        <Route path='/clients' element={auth ? <ClientsList />: <Navigate to='/login' />}></Route>
        <Route path='*' element={<PageNotFound/>}></Route>
      </Routes>

      <Alert
        title='Error'
        width='700px'
        content={alertState.content}
        acceptText={'Accept'}
        open={alertState.open}
        onClose={() => setAlertState({ open: false, content: [] })}
        onAccept={() => setAlertState({ open: false, content: [] })}
        closeOnBackdrop={false}
      />
    </>
  )
}

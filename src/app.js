import React from 'react'
import {
  Routes,
  Route,
  Navigate
} from 'react-router-dom'
import { useSelector } from 'react-redux'

import { Header } from './components/Header'

// pages
import { Login } from './pages/Login'
import { ClientsList } from './pages/ClientsList'
import { PageNotFound } from './pages/PageNotFound'

export const App = () => {
  const cognitoUser = useSelector(state => state.cognitoUser)
  const auth = cognitoUser?.isLoggedIn

  return (
    <>
      {auth && <Header /> }
      <Routes>
        <Route path='/' element={auth ? <Navigate to='/clients' /> : <Navigate to='/login' />} />
        <Route path='/login' element={auth ? <Navigate to='/clients' /> : <Login/>}></Route>
        <Route path='/clients' element={auth ? <ClientsList />: <Navigate to='/login' />}></Route>
        <Route path='*' element={<PageNotFound/>}></Route>
      </Routes>
    </>
  )
}

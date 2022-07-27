import React from 'react'
import { useLocation, useNavigate } from 'react-router-dom'
import { cognitoSignOut } from '../../../store/reducers/cognitoUser'
import { useDispatch } from 'react-redux'

import {
  SidebarContainer,
  MenuItemWrapper,
  MenuItem
} from './styles'

export const Sidebar = () => {
  const location = useLocation()
  const navigate = useNavigate()
  const dispatch = useDispatch()

  return (
    <SidebarContainer>
      <div>
        <MenuItemWrapper
          active={location.pathname.includes('/clients')}
          onClick={() => navigate('/clients')}
        >
          <MenuItem>Clients</MenuItem>
        </MenuItemWrapper>
        <MenuItemWrapper
          active={location.pathname === '/billing'}
          onClick={() => navigate('/billing')}
        >
          <MenuItem>Billing</MenuItem>
        </MenuItemWrapper>
      </div>
      <MenuItemWrapper
        onClick={() => dispatch(cognitoSignOut())}
      >
        <MenuItem>Sign out</MenuItem>
      </MenuItemWrapper>
    </SidebarContainer>
  )
}
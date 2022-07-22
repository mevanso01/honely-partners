import React from 'react'
import { useLocation, useNavigate } from 'react-router-dom'

import {
  SidebarContainer,
  MenuItemWrapper,
  MenuItem
} from './styles'

export const Sidebar = () => {
  const location = useLocation()
  const navigate = useNavigate()

  return (
    <SidebarContainer>
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
    </SidebarContainer>
  )
}
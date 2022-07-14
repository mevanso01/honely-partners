import React from 'react'
import { Sidebar } from './Sidebar'
import { ClientsPortal } from './ClientsPortal'

import {
  Container,
  MainContent
} from './styles'

export const ClientsList = () => {
  return (
    <Container>
      <Sidebar />
      <MainContent>
        <ClientsPortal />
      </MainContent>
    </Container>
  )
}

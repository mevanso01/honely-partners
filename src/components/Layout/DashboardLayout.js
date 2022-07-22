import React from 'react'
import { Sidebar } from '../ClientsList/Sidebar'
import {
  Container,
  MainContent
} from '../ClientsList/styles'

export const DashboardLayout = (props) => {
  return (
    <Container>
      <Sidebar />
      <MainContent>
        {props.children}
      </MainContent>
    </Container>
  )
}

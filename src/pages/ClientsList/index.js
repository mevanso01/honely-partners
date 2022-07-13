import React from 'react'
import { ClientsList as ClientsListController } from '../../components/ClientsList'

export const ClientsList = (props) => {
  return (
    <>
      <ClientsListController {...props} />
    </>
  )
}

import React from 'react'
import { useParams } from 'react-router-dom'
import { ClientDetail as ClientDetailController } from '../../components/ClientDetail'

export const ClientDetail = (props) => {
  const { clientId } = useParams()
  const clientDetailProps = {
    ...props,
    clientId
  }

  return (
    <>
      <ClientDetailController {...clientDetailProps} />
    </>
  )
}

import React from 'react'
import { useParams } from 'react-router-dom'
import { ClientDetail as ClientDetailController } from '../../components/ClientDetail'

export const ClientDetail = (props) => {
  const { apiKey } = useParams()
  const clientDetailProps = {
    ...props,
    apiKey
  }

  return (
    <>
      <ClientDetailController {...clientDetailProps} />
    </>
  )
}

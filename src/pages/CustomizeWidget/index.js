import React from 'react'
import { useParams } from 'react-router-dom'
import { CustomizeWidget as CustomizeWidgetController } from '../../components/CustomizeWidget'

export const CustomizeWidget = (props) => {
  const { apiKey } = useParams()
  const customizeWidgetProps = {
    ...props,
    apiKey
  }

  return (
    <>
      <CustomizeWidgetController {...customizeWidgetProps} />
    </>
  )
}

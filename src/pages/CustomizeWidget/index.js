import React from 'react'
import { useParams } from 'react-router-dom'
import { CustomizeWidget as CustomizeWidgetController } from '../../components/CustomizeWidget'

export const CustomizeWidget = (props) => {
  const { clientId } = useParams()
  const customizeWidgetProps = {
    ...props,
    clientId
  }

  return (
    <>
      <CustomizeWidgetController {...customizeWidgetProps} />
    </>
  )
}

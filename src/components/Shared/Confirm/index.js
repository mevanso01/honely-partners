import React from 'react'
import { Popup } from './Popup'
import { Button, IconButton } from '../Buttons'
import { useTheme } from 'styled-components'
import MdClose from '@meronex/icons/ios/MdClose'
import {
  PopupDialog,
  PopupActions,
  PopupTitle,
  PopupContent,
  PopupIcon
} from './styles'

const ConfirmUI = (props) => {
  const {
    title,
    children,
    content,
    onAccept,
    onCancel,
    onClose,
    acceptText,
    cancelText
  } = props
  return (
    <PopupDialog
      className='popup-dialog'
      width={props.width}
    >
      <PopupIcon>
        <IconButton color='black' onClick={() => onClose()}>
          <MdClose />
        </IconButton>
      </PopupIcon>
      {title && <PopupTitle>{title}</PopupTitle>}
      <PopupContent>
        {content && typeof content === 'string' && content}
        {content && typeof content === 'object' && Array.isArray(content) && (
          <ul>
            {content.map((item, i) => (
              <li key={i}>{item}</li>
            ))}
          </ul>
        )}
        {children}
      </PopupContent>
      {(onCancel || onAccept || onClose) && (
        <PopupActions>
          {onCancel && <Button outline onClick={() => onCancel()}>{cancelText || 'Cancel'}</Button>}
          {onAccept && <Button color='primary' onClick={() => onAccept()}>{acceptText || 'Accept'}</Button>}
        </PopupActions>)}
    </PopupDialog>
  )
}

export const Confirm = (props) => {
  const popupProps = {
    ...props,
    UIComponent: ConfirmUI
  }

  const theme = useTheme()

  return (
    <>
      {
        theme && <Popup {...popupProps} />
      }
    </>
  )
}

export const Alert = Confirm

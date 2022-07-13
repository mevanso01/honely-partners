import React, { useEffect } from 'react'
import MdClose from '@meronex/icons/ios/MdClose'
import { Popup } from '../Confirm/Popup'
import { Button, IconButton } from '../Buttons'
import {
  ModalDialog,
  ModalActions,
  ModalTitle,
  ModalIcon,
  ModalHeader
} from './styles'

const ModalUI = (props) => {
  const {
    title,
    children,
    onAccept,
    onCancel,
    onClose,
    acceptText,
    cancelText,
    isTransparent,
    hideCloseDefault,
    className
  } = props

  const onCloseModal = (e) => {
    if (e.code === 'Escape') {
      onClose && onClose()
    }
  }

  useEffect(() => {
    if (!props.open) return
    document.addEventListener('keydown', onCloseModal)
    return () => document.removeEventListener('keydown', onCloseModal)
  }, [props.open])
  return (
    <ModalDialog
      className={`popup-dialog ${className || ''}`}
      height={props.height}
      width={props.width}
      padding={props.padding}
      overflow={props.overflow}
      isTransparent={isTransparent}
    >
      {!hideCloseDefault && (
        <ModalIcon className='modal-close-icon'>
          <IconButton
            color='black'
            onClick={() => onClose()}
          >
            <MdClose />
          </IconButton>
        </ModalIcon>
      )}
      <ModalHeader>
        {title && (
          <ModalTitle>
            {title}
          </ModalTitle>
        )}
      </ModalHeader>
      {children}
      {(onCancel || onAccept) && (
        <ModalActions>
          {onAccept && <Button color='darkBlue' onClick={() => onAccept()}>{acceptText || 'Accept'}</Button>}
          {onCancel && <Button color='primary' onClick={() => onCancel()}>{cancelText || 'Cancel'}</Button>}
        </ModalActions>)}
    </ModalDialog>
  )
}

export const Modal = (props) => {
  const ModalProps = {
    ...props,
    UIComponent: ModalUI
  }

  return (
    <Popup {...ModalProps} />
  )
}

import React, { useState, useRef, useEffect } from 'react'
import { usePopper } from 'react-popper'
import BiChevronDown from '@meronex/icons/bi/BiChevronDown'
import MdCheckBox from '@meronex/icons/md/MdCheckBox'
import MdCheckBoxOutlineBlank from '@meronex/icons/md/MdCheckBoxOutlineBlank'

import {
  StatusHeaderItem,
  StatusPopoverBody,
  StatusItem
} from './styles'

export const StatusPopper = (props) => {
  const {
    selectedStatuses,
    setSelectedStatuses
  } = props

  const options = [
    { value: 'ACTIVE', content: 'Active' },
    { value: 'INACTIVE', content: 'Inactive ' },
    { value: 'CONFIRMED', content: 'Confirmed' },
    { value: 'UNCONFIRMED', content: 'Unconfirmed' },
    { value: 'DELETED', content: 'Deleted' }
  ]
  const [open, setOpen] = useState(false)
  const referenceElement = useRef()
  const popperElement = useRef()

  const popper = usePopper(referenceElement.current, popperElement.current, {
    placement: 'bottom-start',
    modifiers: [
      { name: 'arrow' },
      {
        name: 'offset',
        options: {
          offset: [0, 12]
        }
      }
    ]
  })

  const { styles, attributes, update } = popper

  useEffect(() => {
    update && update()
  }, [open])

  const handleClickOutside = (e) => {
    if (!open) return
    const outsidePopover = !popperElement.current?.contains(e.target)
    const outsidePopoverMenu = !referenceElement.current?.contains(e.target)
    if (outsidePopover && outsidePopoverMenu) {
      setOpen(false)
    }
  }

  const handleKeyDown = (e) => {
    if (e.keyCode === 27) {
      setOpen(false)
    }
  }

  useEffect(() => {
    window.addEventListener('mouseup', handleClickOutside)
    window.addEventListener('keydown', handleKeyDown)
    return () => {
      window.removeEventListener('mouseup', handleClickOutside)
      window.removeEventListener('keydown', handleKeyDown)
    }
  }, [open])

  const popStyle = { ...styles.popper, visibility: open ? 'visible' : 'hidden', minWidth: '150px' }
  if (!open) {
    popStyle.transform = 'translate3d(0px, 0px, 0px)'
  }

  const handleClickStatus = (value) => {
    if (selectedStatuses.includes(value)) {
      setSelectedStatuses(selectedStatuses.filter(item => item !== value))
    } else {
      setSelectedStatuses([...selectedStatuses, value])
    }
  }

  return (
    <div style={{ overflow: 'hidden' }}>
      <StatusHeaderItem
        ref={referenceElement}
        onClick={() => setOpen(!open)}
      >
        <span>Status</span>
        <BiChevronDown />
      </StatusHeaderItem>
      <StatusPopoverBody ref={popperElement} style={popStyle} {...attributes.popper}>
        {options.map(option => (
          <StatusItem
            key={option.value}
            onClick={() => handleClickStatus(option.value)}
          >
            {selectedStatuses.includes(option.value) ? (
              <MdCheckBox className='active' />
            ) : (
              <MdCheckBoxOutlineBlank />
            )}
            <span>{option.content}</span>
          </StatusItem>
        ))}
      </StatusPopoverBody>
    </div>
  )
}

import React from 'react'
import { SortableContainer, SortableElement } from 'react-sortable-hoc';

const PollQuestion = (props) => {
  const {
    widgetConfig,
    setWidgetConfig
  } = props

  const handleAddPoll = () => {
    const orders = widgetConfig['polls-fields'].reduce((orders, item) => [...orders, item.order], [])
    const maxOrder = orders.length ? Math.max(...orders) : 0
    const newOrder = maxOrder + 1
    setWidgetConfig({
      ...widgetConfig,
      mode: 'CUSTOM',
      extended: widgetConfig?.extended ?? widgetConfig.mode,
      'polls-fields': [
        ...widgetConfig['polls-fields'],
        {
          field_key: 'polls_' + newOrder,
          order: newOrder,
          type: 'button',
          required: false,
          label: '',
          options: []
        }
      ]
    })
  }

  const handleDeletePoll = (order) => {
    setWidgetConfig({
      ...widgetConfig,
      mode: 'CUSTOM',
      extended: widgetConfig?.extended ?? widgetConfig.mode,
      'polls-fields': widgetConfig['polls-fields'].filter(item => item.order !== order)
    })
  }

  let updateItemTimeout = null
  const handleUpdateItem = (order, updatedValue) => {
    clearTimeout(updateItemTimeout)
    updateItemTimeout = setTimeout(() => {
      const updatedPolls = widgetConfig['polls-fields'].map(item => {
        if (item.order === order) {
          return { ...item, ...updatedValue }
        }
        return item
      })
      setWidgetConfig({
        ...widgetConfig,
        mode: 'CUSTOM',
        extended: widgetConfig?.extended ?? widgetConfig.mode,
        'polls-fields': updatedPolls
      })
    }, 750)
  }

  const handleAddPollOption = (order, e) => {
    if (e.keyCode === 13 && e.target.value) {
      const updatedPolls = widgetConfig['polls-fields'].map(item => {
        if (item.order === order) {
          return { ...item, options: [...item.options, e.target.value] }
        }
        return item
      })
      setWidgetConfig({
        ...widgetConfig,
        mode: 'CUSTOM',
        extended: widgetConfig?.extended ?? widgetConfig.mode,
        'polls-fields': updatedPolls
      })
      e.target.value = ''
    }
  }

  let updateOptionTimeout = null
  const handleUpdateOption = (order, index, value) => {
    clearTimeout(updateOptionTimeout)
    updateOptionTimeout = setTimeout(() => {
    const updatedPolls = widgetConfig['polls-fields'].map(item => {
        if (item.order === order) {
          const updatedOptions = [...item.options]
          updatedOptions[index] = value
          return { ...item, options: updatedOptions }
        }
        return item
      })
      setWidgetConfig({
        ...widgetConfig,
        mode: 'CUSTOM',
        extended: widgetConfig?.extended ?? widgetConfig.mode,
        'polls-fields': updatedPolls
      })
    }, 750)
  }

  const handleDeleteOption = (order, index) => {
    const updatedPolls = widgetConfig['polls-fields'].map(item => {
      if (item.order === order) {
        let updatedOptions = [...item.options]
        updatedOptions.splice(index, 1)
        return { ...item, options: updatedOptions }
      }
      return item
    })
    setWidgetConfig({
      ...widgetConfig,
      mode: 'CUSTOM',
      extended: widgetConfig?.extended ?? widgetConfig.mode,
      'polls-fields': updatedPolls
    })
  }

  const SortableItem = SortableElement(({ poll, handleUpdateItem, handleDeletePoll, handleUpdateOption, handleAddPollOption }) => {
    return (
      <div className='poll-field-item-container'>
        <div className='add-input-fields-container'>
          <span className='mdi mdi-view-headline' />
          <input
            className='widget-input'
            defaultValue={poll.label}
            onChange={e => handleUpdateItem(poll.order, { label: e.target.value })}
          />
          <button
            className='poll-input-delete-btn'
            onClick={() => handleDeletePoll(poll.order)}
          >
            x
          </button>
        </div>
        <div className='poll-inputs-container'>
          {poll.options.map((option, index) => (
            <div
              key={option + index}
              className='poll-question-input-wrapper'
            >
              <input
                className='widget-input'
                defaultValue={option}
                onChange={e => handleUpdateOption(poll.order, index, e.target.value)}
              />
              <button
                className='poll-input-delete-btn'
                onClick={() => handleDeleteOption(poll.order, index)}
              >
                x
              </button>
            </div>
          ))}
          <div className='poll-question-input-wrapper'>
            <input
              className='widget-input'
              onKeyUp={e => handleAddPollOption(poll.order, e)}
            />
          </div>
        </div>
        <div className='requirement-checkbox'>
          <button
            className='poll-checkbox-btn'
            onPointerDown={() => handleUpdateItem(poll.order, { required: !poll.required })}
          >
            {poll.required ? (
              <span className='mdi mdi-checkbox-marked-outline active' />
            ) : (
              <span className='mdi mdi-checkbox-blank-outline' />
            )}
            Make this steo a requirement
          </button>
        </div>
      </div>
    )
  })

  const SortableList = SortableContainer(({ items, handleUpdateItem, handleDeletePoll, handleUpdateOption, handleAddPollOption }) => {
    return (
      <div>
        {items.map((item, index) => (
          <SortableItem
            key={item.order}
            index={index}
            poll={item}
            handleUpdateItem={handleUpdateItem}
            handleDeletePoll={handleDeletePoll}
            handleUpdateOption={handleUpdateOption}
            handleAddPollOption={handleAddPollOption}
          />
        ))}
      </div>
    )
  });

  const onSortEnd = ({oldIndex, newIndex}) => {
    const copyListItems = [...widgetConfig['polls-fields']];
    const dragItemContent = copyListItems[oldIndex];
    copyListItems.splice(oldIndex, 1);
    copyListItems.splice(newIndex, 0, dragItemContent);

    setWidgetConfig({
      ...widgetConfig,
      mode: 'CUSTOM',
      extended: widgetConfig?.extended ?? widgetConfig.mode,
      'polls-fields': copyListItems
    })
  };

  return (
    <section className='widget-block-section'>
      <h3>Poll Question</h3>
      <SortableList
        items={widgetConfig['polls-fields']}
        onSortEnd={onSortEnd}
        handleUpdateItem={handleUpdateItem}
        handleDeletePoll={handleDeletePoll}
        handleUpdateOption={handleUpdateOption}
        handleAddPollOption={handleAddPollOption}
      />
      <div className='add-item-containter'>
        <div className='widget-block-divider' />
        <span
          className='mdi mdi-plus-circle-outline'
          onClick={() => handleAddPoll()}
        />
      </div>
    </section>
  )
}

export default PollQuestion

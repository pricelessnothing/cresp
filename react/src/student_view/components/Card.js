/* eslint-disable react/prop-types */
import React from 'react'
import { useDrag } from 'react-dnd'

export const Card = (props) => {

  const getContent = () => {
    const {contentType, contentValue} = props.data
    switch(contentType) {
    case 'image':
      return (
        <img src={contentValue} />
      )
    case 'text':
      return contentValue
    default:
      return ':('
    }
  }

  const content = getContent()

  const [{ isDragging }, drag] = useDrag({
    item: { type: 'card', id: props.data.id},
    collect: (monitor) => ({
      isDragging: !!monitor.isDragging(),
    }),
  })

  return (
    <div className="card" ref={drag} style={{opacity: isDragging ? 0 : 1}}>
      {content}
    </div>
  )
}
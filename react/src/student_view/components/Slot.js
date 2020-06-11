/* eslint-disable react/prop-types */
import React, { useState, useEffect, useContext} from 'react'
import { useDrop } from 'react-dnd'
import EngineContext from '../context'
import { Card } from './Card'

export function Slot({tax, feat, children}) {

  const engine = useContext(EngineContext)
  const [child, setChild] = useState(children)
  const [isCorrect, setCorrect] = useState(engine.isCorrect(tax, feat))

  const [{ isOver }, drop] = useDrop({
    accept: 'card',
    drop: (item) => engine.moveCard(item.id, tax, feat),
    collect: (monitor) => ({
      isOver: !!monitor.isOver()
    }),
  })

  useEffect(() => engine.subscribe(() => {
    const card = engine.getSlotContent(tax, feat)
    if (card) {
      setChild(<Card data={card} />)
    } else {
      setChild(null)
    }
    setCorrect(engine.isCorrect(tax, feat))
  }), [])

  return (
    <div
      className="slot" style={{borderColor: isOver ? '#090' : '#999'}} ref={drop}
    >
      <div className={ isCorrect ? 'slot-content correct' : 'slot-content'}>
        { child }
      </div>
    </div>)
}
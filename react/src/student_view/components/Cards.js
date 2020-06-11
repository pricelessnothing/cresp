import React, { useState, useEffect, useContext } from 'react'
import EngineContext from '../context'
import { Card } from './Card'

export const Cards = () => {

  const engine = useContext(EngineContext)
  const [cards, setCards] = useState(mapCards())

  function mapCards() {
    const errors = engine.getErrors('cards')
    return(<tbody>
      {engine.getTaxonomies().map(t => (<tr key={t.id}>
        {engine.getFeatures().map(f => {
          const error = errors.find(e => e[0] === t.id && e[1] === f.id) ?
            'error' : ''
          return (
            <td key={f.id}>
              <Card card={(engine.getCard(t.id, f.id))} error={error} />
            </td>
          )}
        )}
      </tr>))}
    </tbody>)
  }

  useEffect(() => engine.subscribe(() => {
    setCards(mapCards())
  }), [])

  return (
    <table className="cards">{cards}</table>
  )
}
import React, { useState, useEffect, useContext } from 'react'
import {Card} from './Card'
import EngineContext from '../context'

export const Deck = () => {

  const mapDeck = (deck) => deck.map(card =>
    <Card data={card} key={card.id} />
  )

  const engine = useContext(EngineContext)

  const [deck, setDeck] = useState(mapDeck(engine.getDeck()))

  useEffect(() => engine.subscribe(() => {
    setDeck(mapDeck(engine.getDeck()))
  }), [])

  return (
    <div className="card-row">
      {deck}
    </div>
  )
}
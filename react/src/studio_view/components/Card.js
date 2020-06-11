/* eslint-disable react/prop-types */
import React, { useContext } from 'react'
import EngineContext from '../context'

export const Card = ({card, error}) => {

  const engine = useContext(EngineContext)

  function getCardView() {
    switch (card.contentType) {
    case 'image':
      return <img src={card.contentValue} alt={card.contentValue} />
    case 'text':
      return card.contentValue
    default:
      return ':('
    }
  }

  function editCard() {
    engine.editCard(card.taxonomy, card.feature)
  }

  return (
    <div className={`setup-card ${error}`}>
      <div className="preview">
        {getCardView()}
      </div>
      <span className="edit-card" onClick={editCard}>✐</span>
    </div>
  )
}
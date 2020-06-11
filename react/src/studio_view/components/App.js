/* eslint-disable react/prop-types */
/* eslint-disable no-unused-vars */
import React, { useState, useEffect, useContext } from 'react'

import { Taxonomies } from './Taxonomies'
import { Cards } from './Cards'
import { Features } from './Features'
import '../styles/global.css'
import EngineContext from '../context'
import { CardEdit } from './CardEdit'

export const App = ({DOMNode, inputData, cardSize}) => {

  const engine = useContext(EngineContext)
  const [editableCard, setEditableCard] = useState(null)
  const [bs, setBs] = useState('idle')
  const [cardWidth, setCardWidth] = useState(cardSize[0])
  const [cardHeight, setCardHeight] = useState(cardSize[1])

  engine.initState(inputData)

  DOMNode.addEventListener('updateButtonState', e => {
    setBs(e.detail)
  })

  useEffect(() => engine.subscribe(() => {
    setEditableCard(engine.getEditableCard())
  }), [])

  function updateCardWidth(e) {
    setCardWidth(e.target.value ? +e.target.value : 150)
  }

  function updateCardHeight(e) {
    setCardHeight(e.target.value ? +e.target.value : 150)
  }

  function exportSettings() {
    const result = engine.exportCards()
    if (typeof result === 'string') {
      alert(result)
    } else {
      const exportEvent = new CustomEvent('exportCards', {'detail': {
        'the_data': [result, cardWidth, cardHeight]
      }})
      DOMNode.dispatchEvent(exportEvent)
    }
  }

  return (<div className="wrapper">
    <div className="table-wrapper">
      <Taxonomies />
      <div className="feat-cards-container">
        <Features />
        <Cards />
      </div>
    </div>
    <footer>
      <div className="card-size-setup">
        Настройка размеров карточки
        <div className="input-number-group">
          <label for="width">Ширина:</label>
          <input type="number" id="width" value={cardWidth} onChange={updateCardWidth} />
        </div>
        <div className="input-number-group">
          <label for="height">Высота:</label>
          <input type="number" id="height" value={cardHeight} onChange={updateCardHeight} />
        </div>
        <p>Влияет на отображение в курсе</p>
      </div>
      <button onClick={exportSettings} className={bs}>Сохранить</button>
    </footer>
    <CardEdit card={editableCard}/>
  </div>)
}
/* eslint-disable react/prop-types */
import React, { useContext } from 'react'
import EngineContext from '../context'

export const CardEdit = ({card}) => {

  const engine = useContext(EngineContext)
  const types = {'text': 'Текст', 'image': 'Рисунок'}

  let type = card && card.contentType || '',
    value = card && card.contentValue || ''

  function saveCard() {
    if (type === 'image' && !value.startsWith('http')) {
      value = 'http://' + value
    }
    engine.updateCard(type, value)
    engine.editCard(null)
  }

  function cancel() {
    engine.editCard(null)
  }

  function updateType(e) {
    type = e.target.value
  }

  function updateValue(e) {
    value = e.target.value
  }

  function mbSubmit(e) {
    if (e.key === 'Enter') {
      saveCard()
    }
  }

  return (
    <>  { card &&
    <div className="card-edit">
      <div className="fader"></div>
      <div className="modal-body">
        <div className="input-group">
          <span>Тип карточки:</span>
          <select defaultValue={card && card.contentType || ''} onChange={updateType}>
            {Object.entries(types).map(t => (
              <option key={t[0]} value={t[0]}>{t[1]}</option>
            ))}
          </select>
        </div>

        <div className="input-group">
          <span>Содержимое: </span>
          <input type="text" defaultValue={card && card.contentValue || ''} onInput={updateValue} onKeyDown={mbSubmit}/>
        </div>
        <footer>
          <button onClick={cancel} className="btn-cancel">Отмена</button>
          <button onClick={saveCard}>Сохранить</button>
        </footer>

      </div>
    </div>
    }
    </>)
}
/* eslint-disable react/prop-types */
import React, { useContext } from 'react'
import EngineContext from '../context'

export const Feature = ({text, id, error}) => {

  const engine = useContext(EngineContext)

  function updateFeature(e) {
    engine.updateFeature(e.target.value, id)
  }

  function removeFeature() {
    engine.removeFeature(id)
  }

  return <div className={`feature ${error}`}>
    <input type="text" defaultValue={text} onChange={updateFeature}/>
    <button className="rm-feature" onClick={removeFeature}>✕</button>
  </div>
}
/* eslint-disable react/prop-types */
import React, { useContext } from 'react'
import EngineContext from '../context'

export const Taxonomy = ({text, id, error}) => {

  const engine = useContext(EngineContext)

  function updateTaxonomy(e) {
    engine.updateTaxonomy(e.target.value, id)
  }

  function removeTaxonomy() {
    engine.removeTaxonomy(id)
  }

  return <div className={`taxonomy ${error}`}>
    <input type="text" defaultValue={text} onChange={updateTaxonomy}/>
    <button className="rm-taxonomy" onClick={removeTaxonomy}>✕</button>
  </div>
}
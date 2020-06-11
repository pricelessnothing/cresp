import React, {useEffect, useState, useContext} from 'react'
import EngineContext from '../context'
import { Taxonomy } from './Taxonomy'

export const Taxonomies = () => {

  const engine = useContext(EngineContext)
  const [taxonomies, setTaxonomies] = useState(mapTaxonomies())

  useEffect(() => engine.subscribe(() => {
    setTaxonomies(mapTaxonomies())
  }), [])

  function mapTaxonomies() {
    const errors = engine.getErrors('taxonomies')
    return engine.getTaxonomies().map(tax => {
      const error = errors.includes(tax.id) ? 'error' : ''
      return (
        <Taxonomy
          text={tax.text}
          id={tax.id}
          key={tax.id}
          error={error}
        />)
    })
  }

  function newTaxonomy() {
    engine.addTaxonomy()
  }

  return (
    <div className="taxonomies">
      {taxonomies}
      <button className="add-taxonomy" onClick={newTaxonomy}>+</button>
    </div>
  )
}
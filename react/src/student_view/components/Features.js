import React, {useState, useEffect, useContext} from 'react'
import EngineContext from '../context'
import { Feature } from './Feature'

export const Features = () => {

  const engine = useContext(EngineContext)
  const [features, setFeatures] = useState(mapFeatures())

  useEffect(() => engine.subscribe(() => {
    setFeatures(mapFeatures())
  }), [])

  function mapFeatures() {
    const errors = engine.getErrors('features')
    return engine.getFeatures().map(feature => {
      let error = errors.includes(feature.id) ? 'error' : ''
      return (
        <Feature
          text={feature.text}
          id={feature.id}
          key={feature.id}
          error={error}
        />)
    })
  }

  function newFeature() {
    engine.addFeature()
  }

  return (
    <div className="features">
      {features}
      <button className="add-feature" onClick={newFeature}>+</button>
    </div>
  )
}
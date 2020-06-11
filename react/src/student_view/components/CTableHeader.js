import React, { useContext } from 'react'
import EngineContext from '../context'

export const CTableHeader = () => {

  const engine = useContext(EngineContext)

  return (<div className="table-header">
    {[...engine.getHeaders()].map(header => <div key={header}>{header}</div>)}
  </div>)
}
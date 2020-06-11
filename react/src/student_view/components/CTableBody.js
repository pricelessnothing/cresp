import React, { useContext } from 'react'
import { Slot } from './Slot'
import EngineContext from '../context'

export const CTableBody = () => {

  const engine = useContext(EngineContext)

  return (
    <div className="table-body">
      {
        engine.getRows().map((row, ri) => {
          const [name, content] = row
          return <div className="table-row" key={name}>
            <div className="row-name">{name}</div>
            {content.map((child, i) => (
              <Slot
                tax={name}
                feat={i}
                key={ri*100 + i}
              >
              </Slot>
            ))}
          </div>
        })
      }
    </div>
  )
}
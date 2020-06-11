/* eslint-disable react/prop-types */
/* eslint-disable no-unused-vars */
import React, { useContext } from 'react'
import {DndProvider} from 'react-dnd'
import Backend from 'react-dnd-html5-backend'

import '../styles/global.css'

import { CTable } from './CTable'
import { Deck } from './Deck'

import EngineContext from '../context'

export const App = ({inputData}) =>{

  const engine = useContext(EngineContext)

  engine.initState(inputData)

  return (<DndProvider backend={Backend}>
    <Deck />
    <CTable />
  </DndProvider>)
}

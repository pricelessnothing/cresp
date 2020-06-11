/* eslint-disable no-unused-vars */
import React from 'react'
import ReactDOM from 'react-dom'
import {App} from './components/App'
import Engine from './engine'
import EngineContext from './context'


window.startReactCrespXBlock = function (element) {
  let encoded_shit = element.getAttribute('inputdatajson').split('\'')
  encoded_shit = encoded_shit.length === 1 ? encoded_shit[0] : encoded_shit[1]
  let decoded_shit = atob(encoded_shit)
  let input_shit = JSON.parse(decoded_shit)

  ReactDOM.render(
    <EngineContext.Provider value={new Engine()}>
      <App inputData={input_shit}/>
    </EngineContext.Provider>,
    element
  )
}


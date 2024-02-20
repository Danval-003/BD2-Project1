/* eslint-disable import/no-unresolved */
import React, { useState } from 'react'
import { Menu } from '@components'
import { Principal, Secundary } from '@pages'
import './App.scss'

const App = () => {
  const [actualPage, setActualPage] = useState('principal')

  const componentDict = {
    principal: Principal,
    secundary: Secundary,
  }

  return (
    <div className="app">
      <Menu actualPage={actualPage} setActualPage={setActualPage} dataList={Object.keys(componentDict)} />
      {React.createElement(componentDict[actualPage])}
    </div>
  )
}

export default App

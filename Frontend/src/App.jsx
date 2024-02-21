/* eslint-disable import/no-unresolved */
import React, { useState } from 'react'
import { Menu } from '@components'
import { Chars, Rankings } from '@pages'
import './App.scss'

const App = () => {
  const [actualPage, setActualPage] = useState('chars')

  const componentDict = {
    chars: Chars,
    rankings: Rankings,
  }

  return (
    <div className="app">
      <Menu actualPage={actualPage} setActualPage={setActualPage} dataList={Object.keys(componentDict)} />
      <div className="content">
        {React.createElement(componentDict[actualPage])}
      </div>
    </div>
  )
}

export default App

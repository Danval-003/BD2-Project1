/* eslint-disable import/no-unresolved */
import React, { useState } from 'react'
import './Rankings.scss'
import { Ranking } from '@components'

const Rankings = () => {
  const elements = [<Ranking />, <Ranking />, <Ranking />]

  return (
    <div className="rankings">
      {elements.map((element) => {

        return(
          <div className='rank'>
            {element}
          </div>
          )
        
        })}
    </div>

  )
}

export default Rankings

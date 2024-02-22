/* eslint-disable import/no-unresolved */
import React from 'react'
import './Rankings.scss'
import { Ranking, Carrousel } from '@components'

const Rankings = () => {
  const elements = [<Ranking />, <Ranking />, <Ranking />]
  const cards = [
    {
      key: 1,
      content: (
        <div className="rank">
          <Ranking />
        </div>
      ),
    },
    {
      key: 2,
      content: (
        <div className="rank">
          <Ranking />
        </div>
      ),
    },
    {
      key: 3,
      content: (
        <div className="rank">
          <Ranking />
        </div>
      ),
    },
  ]

  return (
    <div className="rankings">
      <div className="carrousel-container">
        <Carrousel cards={cards} offset={2} />
      </div>
    </div>

  )
}

export default Rankings

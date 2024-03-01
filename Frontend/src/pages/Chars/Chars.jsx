/* eslint-disable max-len */
/* eslint-disable import/no-unresolved */
import React, { useState } from 'react'
import './Chars.scss'
import { CharContainer } from '@components'

const Chars = () => {
  const [actualChar, setActualChar] = useState(0)
  const charList = [
    <iframe
      width="100%"
      height="100%"
      src="https://charts.mongodb.com/charts-project-0-xrrng/embed/charts?id=65d6dee0-adbc-496f-843e-a9efa3f1d979&maxDataAge=3600&theme=light&autoRefresh=true"
      className="chart-frame"
      title="chart-1"
    />,
    <iframe
      width="640"
      height="480"
      src="https://charts.mongodb.com/charts-project-0-xrrng/embed/charts?id=65d6cb75-adbc-4183-8efc-a9efa306a435&maxDataAge=3600&theme=light&autoRefresh=true"
      className="chart-frame"
      title="chart-2"
    />,
    <iframe
      width="640"
      height="480"
      src="https://charts.mongodb.com/charts-project-0-xrrng/embed/charts?id=65dafd38-6d36-4650-8615-048c3d20226f&maxDataAge=3600&theme=light&autoRefresh=true"
      className="chart-frame"
      title="chart-3"
    />,
    <iframe
      width="640"
      height="480"
      src="https://charts.mongodb.com/charts-project-0-xrrng/embed/charts?id=65dbb2a0-7acb-4bb5-811a-94294a03b43d&maxDataAge=3600&theme=light&autoRefresh=true"
      className="chart-frame"
      title="chart-4"
    />,
    <iframe
      width="640"
      height="480"
      src="https://charts.mongodb.com/charts-project-0-xrrng/embed/charts?id=65dbb669-d109-4d5c-8759-19f06aa5aa93&maxDataAge=3600&theme=light&autoRefresh=true"
      className="chart-frame"
      title="chart-5"
    />,
    <iframe
      width="640"
      height="480"
      src="https://charts.mongodb.com/charts-project-0-xrrng/embed/charts?id=65dbb936-6d36-4614-833f-048c3d2f7ef3&maxDataAge=3600&theme=light&autoRefresh=true"
      className="chart-frame"
      title="chart-6"
    />,
  ]

  const nextChar = () => {
    if (actualChar === charList.length - 1) {
      setActualChar(0)
    } else {
      setActualChar(actualChar + 1)
    }
  }

  const prevChar = () => {
    if (actualChar === 0) {
      setActualChar(charList.length - 1)
    } else {
      setActualChar(actualChar - 1)
    }
  }

  return (
    <div className="chars-cont">
      <div className="carrousel-char">
        <CharContainer content={charList[actualChar]} />
      </div>
      <button className="next" type="button" onClick={nextChar}> Next</button>
      <button className="prev" type="button" onClick={prevChar}> Previous</button>
    </div>
  )
}

export default Chars

import React, { useEffect, useState } from 'react'
import PropTypes from 'prop-types'
import useApi2 from '../../hooks/useApi2'
import './ImageRanking.scss'

const ImageRanking = () => {
  const [count, setCount] = useState(-1)
  const [response, , handleRequest] = useApi2()
  const [listStudents, setListStudents] = useState([])
  const [actualStudent, setActualStudent] = useState(0)

  useEffect(() => {
    if (count === -1) {
      handleRequest('GET', 'premade/bestStudents/limit')
    }
  }, [count])

  useEffect(() => {
    if (response.length > 0 && count === -1) {
      console.log('Nose', response)
      setCount(response.length)
      setListStudents(response)
      console.log('Nose', listStudents)
    }
  }, [response])

  useEffect(() => { console.log(listStudents) }, [listStudents])

  return (
    <div className="imageranking">
      <div className="imageranking__title">
        <h1>Our best students</h1>
      </div>
      <div className="__content">
        {listStudents.length > 0 ? (
          <>
            <img
              src={`http://localhost:5555/image/${listStudents[actualStudent]._id}.jpg`}
              className="student-image"
              alt=""
            />
            <div className="text__content">
              <h2>{listStudents[actualStudent].student}</h2>
              <div className="info-cont">
                <p>
                  <b>Mean:</b>
                  {' '}
                  {` ${listStudents[actualStudent].actualMean.toFixed(2)}`}
                </p>
                <p>
                  <b>Position:</b>
                  {' '}
                  {` ${actualStudent + 1}`}
                </p>
                <p>
                  <b>School:</b>
                  {' '}
                  {` ${listStudents[actualStudent].idSchool.idSchool}`}
                </p>
                <p>
                  <b>Grade:</b>
                  {' '}
                  {` ${listStudents[actualStudent].idGrade}`}
                </p>
                <p>
                  <b>Section:</b>
                  {' '}
                  {` ${listStudents[actualStudent].gradeSection}`}
                </p>
              </div>
            </div>
          </>
        ) : null}
      </div>
      {listStudents.length > 0 ? (
        <div className="buttons-cont">
          <button
            type="button"
            onClick={() => {
              if (actualStudent === 0) {
                setActualStudent(listStudents.length - 1)
              } else {
                setActualStudent(actualStudent - 1)
              }
            }}
          >
            {'<'}
          </button>
          <button
            type="button"
            onClick={() => {
              if (actualStudent === listStudents.length - 1) {
                setActualStudent(0)
              } else {
                setActualStudent(actualStudent + 1)
              }
            }}
          >
            {'>'}
          </button>
        </div>
      ) : null}
    </div>
  )
}

export default ImageRanking

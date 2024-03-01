/* eslint-disable no-underscore-dangle */
/* eslint-disable react/jsx-no-useless-fragment */
/* eslint-disable import/no-unresolved */
import React, { useEffect, useState } from 'react'
import './Rankings.scss'
import { Ranking, Carrousel, ImageRanking } from '@components'
import { LoadTemplate } from '@assets'
import useApi2 from '../../hooks/useApi2'

const Rankings = () => {
  const [response, , handleRequest] = useApi2()
  const [count, SetCount] = useState(0)
  const [newCards, setNewCards] = useState([])
  const [carrousel, setCarrousel] = useState(<></>)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    if (count === 1) {
      handleRequest('GET', 'premade/bestStudents', {})
    } else if (count === 2) {
      handleRequest('GET', 'premade/bestTeachers', {})
    } else if (count === 3) {
      handleRequest('GET', 'premade/bestGrades', {})
    }
  }, [count])

  useEffect(() => {
    if (count === 0) {
      SetCount(1)
    } else if (count === 1 && response.length > 0) {
      const rankList = response.map((student) => ({
        name: student._id.student,
        score: student.mean.toFixed(2),
      }))

      setNewCards(() => {
        const newCard = {
          key: 'students',
          content: (
            <div className="rank">
              <Ranking rankList={rankList} titleName="Best Students" nameN="Students" scoreName="Avg. grade" />
            </div>),
        }

        return [...newCards, newCard]
      })
      SetCount(2)
    } else if (count === 2 && response.length > 0) {
      const rankList = response.map((teacher) => ({
        name: teacher._id.teacher,
        score: teacher.mean.toFixed(2),
      }))

      setNewCards(() => {
        const newCard = {
          key: 'teachers',
          content: (
            <div className="rank">
              <Ranking rankList={rankList} titleName="Best Teachers" nameN="Teachers" scoreName="Avg. perf." />
            </div>),
        }

        return [newCard, ...newCards]
      })
      SetCount(3)
    } else if (count === 3 && response.length > 0) {
      const rankList = response.map((course) => ({
        name: `${course._id.Courses}-${course._id.grade}`,
        score: course.mean.toFixed(2),
      }))

      setNewCards(() => {
        const newCard = {
          key: 'teachers',
          content: (
            <div className="rank">
              <Ranking rankList={rankList} titleName="Best Courses" nameN="Courses" scoreName="Avg. grade" />
            </div>),
        }

        return [newCard, ...newCards]
      })
      setLoading(false)
    } else if (count <= 3) {
      SetCount(count + 1)
    }
  }, [response])

  const [carrouselKey, setCarrouselKey] = useState(0)

  useEffect(() => {
    if (carrouselKey === 3) {
      if (newCards.length > 0) {
        setCarrousel(
          <Carrousel key={carrouselKey} cards={newCards} offset={2} />,
        )
      }
    }
    setCarrouselKey(carrouselKey + 1)
  }, [newCards])

  const content = (
    <div className="content-container">
      <div className="carrousel-container">
        {carrousel}
      </div>
      <div className="image-ranking-container">
        <ImageRanking />
      </div>
    </div>
  )

  return (
    <div className={`rankings ${loading ? 'loading' : ''}`}>
      {loading ? (
        <div className="load">
          <img src={LoadTemplate} alt="Loading" />
        </div>
      ) : content}
    </div>

  )
}

export default Rankings

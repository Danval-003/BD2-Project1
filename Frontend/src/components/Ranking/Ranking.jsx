import React, { useState } from 'react'
import PropTypes from 'prop-types'
import './Ranking.scss'
import { useSpring, animated } from 'react-spring'

const Ranking = ({
  titleName, rankList, nameN, scoreName,
}) => {
  const [show, setShown] = useState(false)
  const props3 = useSpring({
    transform: show ? 'scale(1.03)' : 'scale(1)',
    boxShadow: show
      ? '0 20px 25px rgb(0 0 0 / 25%)'
      : '0 2px 10px rgb(0 0 0 / 8%)',
  })

  return ((
    <animated.div
      className="ranking"
      style={props3}
      onMouseEnter={() => setShown(true)}
      onMouseLeave={() => setShown(false)}
    >

      <h2>{titleName}</h2>
      <div className="header">
        <span>{nameN}</span>
        <span className="score">{scoreName}</span>
      </div>
      <div className="container-list">
        {rankList.map((rank) => (
          <div className="list-element">
            <span className="name">
              {rank.name}
            </span>
            <span className="score">
              {rank.score}
            </span>
          </div>
        ))}
      </div>
    </animated.div>
  ))
}

Ranking.propTypes = {
  titleName: PropTypes.string,
  rankList: PropTypes.arrayOf(PropTypes.shape({
    name: PropTypes.string,
    score: PropTypes.number,
  })),
  nameN: PropTypes.string,
  scoreName: PropTypes.string,

}

Ranking.defaultProps = {
  titleName: 'Ranking',
  rankList: [{ name: 'Player 1', score: 100 }, { name: 'Player 2', score: 90 }, { name: 'Player 3', score: 80 }],
  nameN: 'Name',
  scoreName: 'Score',
}

export default Ranking

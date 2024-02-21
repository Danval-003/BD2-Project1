import React from 'react'
import PropTypes from 'prop-types'
import './Ranking.scss'

const Ranking = ({
  titleName, rankList, nameN, scoreName,
}) => (
  <div className="ranking">
    <h2>{titleName}</h2>
    <div className="header">
      <span>{nameN}</span>
      <span>{scoreName}</span>
    </div>
    <ul>
      {rankList.map((rank, index) => (
        <li key={index}>
          <span>
            {rank.name}
          </span>
          <span>
            {rank.score}
          </span>
        </li>
      ))}
    </ul>
  </div>
)

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

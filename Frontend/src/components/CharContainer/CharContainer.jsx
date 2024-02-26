import React from 'react'
import PropTypes from 'prop-types'
import './CharContainer.scss'

const CharContainer = ({ isBigger, content }) => (
  <div className={`charcontainer ${isBigger ? 'bigger' : ''}`}>
    {content}
  </div>
)

CharContainer.propTypes = {
  isBigger: PropTypes.bool,
  content: PropTypes.node.isRequired,
}

CharContainer.defaultProps = {
  isBigger: false,
}

export default CharContainer

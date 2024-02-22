import React, { useState, useEffect } from 'react'
import Carousel from 'react-spring-3d-carousel'
import { config } from 'react-spring'
import PropTypes from 'prop-types'
import './Carrousel.scss'

const Carrousel = ({ cards, offset, showArrows }) => {
  const [offsetRadius, setOffsetRadius] = useState(2)
  const [showArrows2, setShowArrows2] = useState(false)
  const [goToSlide, setGoToSlide] = useState(null)

  const table = cards.map((element, index) => ({ ...element, onClick: () => setGoToSlide(index) }))
  const [cards2] = useState(table)

  useEffect(() => {
    setOffsetRadius(offset)
    setShowArrows2(showArrows)
  }, [offset, showArrows])

  return (
    <div className="carrousel">
      <Carousel
        slides={cards2}
        goToSlide={goToSlide}
        offsetRadius={offsetRadius}
        showNavigation={showArrows2}
        animationConfig={config.gentle}
      />
    </div>
  )
}

Carrousel.propTypes = {
  cards: PropTypes.arrayOf(PropTypes.shape({})).isRequired,
  offset: PropTypes.number,
  showArrows: PropTypes.bool,
}

Carrousel.defaultProps = {
  offset: 2,
  showArrows: false,
}

export default Carrousel

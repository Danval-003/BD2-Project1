import React from 'react'
import PropTypes from 'prop-types'
import './Menu.scss'

const Menu = ({ dataList, setActualPage, actualPage }) => {
  const changePage = (page) => {
    setActualPage(page)
  }

  return (
    <div className="menu">
      <div className="title">
        Escolar Administrator Web
      </div>
      {dataList.map((page) => (
        <button
          type="button"
          className={`menu_button ${page === actualPage ? 'active' : ''}`}
          onClick={() => changePage(page)}
        >
          {page}
        </button>
      ))}
    </div>
  )
}

Menu.propTypes = {
  dataList: PropTypes.arrayOf(PropTypes.string),
  setActualPage: PropTypes.func.isRequired,
  actualPage: PropTypes.string.isRequired,
}

Menu.defaultProps = {
  dataList: ['principal', 'secundary'],
}

export default Menu

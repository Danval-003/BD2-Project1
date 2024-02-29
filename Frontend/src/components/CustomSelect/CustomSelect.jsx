import React, { useState } from 'react'
import PropTypes from 'prop-types'
import './CustomSelect.scss'

const CustomSelect = ({ options, placeholder, onChange }) => {
  const [selectedOption, setSelectedOption] = useState('')

  const handleInputChange = (event) => {
    const newValue = event.target.value
    setSelectedOption(newValue)
    onChange(newValue)
  }

  return (
    <select
      value={selectedOption}
      onChange={handleInputChange}
    >
      <option value="" disabled>{placeholder}</option>
      {options.map((option, index) => (
        <option key={index} value={option}>{option}</option>
      ))}
    </select>
  )
}
CustomSelect.defaultProps = {
  placeholder: '',
  onChange: () => {},
}
CustomSelect.propTypes = {
  /** Array of strings to display as select options */
  options: PropTypes.arrayOf(PropTypes.string).isRequired,
  /** Placeholder text for the select */
  placeholder: PropTypes.string,
  /** Function to call when the select value changes */
  onChange: PropTypes.func,
}

export default CustomSelect

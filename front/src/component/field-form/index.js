import { useState } from 'react'
import './index.css'

const Component = ({ placeholder, button, onSubmit }) => {
  const [value, setValue] = useState('')

  const handleChange = (e) => setValue(e.target.value)

  const handleSubmit = () => {
    if (value.length === 0) return null
    onSubmit(value)
    setValue('')
  }

  const isDisabled = value.length === 0

  return (
    <div className="field-form">
      <textarea
        onChange={handleChange}
        value={value}
        rows={2}
        placeholder={placeholder}
        className="field-form__field"
      ></textarea>
      <button
        disabled={isDisabled}
        onClick={handleSubmit}
        className="field-form__button"
      >
        {button}
      </button>
    </div>
  )
}

export default Component

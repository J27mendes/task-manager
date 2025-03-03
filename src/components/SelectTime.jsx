import PropTypes from 'prop-types'
import { forwardRef } from 'react'

import InputErrorMessage from './InputErrorMessage;'
import InputLabel from './InputLabel'

const SelectTime = forwardRef(({ disabled, errorMessage, ...props }, ref) => {
  return (
    <div className="flex flex-col gap-1 text-left">
      <InputLabel htmlFor="time">Horário</InputLabel>
      <select
        id="time"
        className="rounded-lg border border-solid border-brend-border px-4 py-3 outline-brend-primary placeholder:text-sm placeholder:text-brend-lightGrey"
        ref={ref}
        disabled={disabled}
        {...props}
      >
        <option value={'morning'}>Manhã</option>
        <option value={'afternoon'}>Tarde</option>
        <option value={'evening'}>Noite</option>
      </select>
      {errorMessage && <InputErrorMessage>{errorMessage}</InputErrorMessage>}
    </div>
  )
})

SelectTime.displayName = 'SelectTime'
SelectTime.propTypes = {
  errorMessage: PropTypes.string,
}

export default SelectTime

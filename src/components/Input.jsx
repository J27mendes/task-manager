import PropTypes from "prop-types"
import { forwardRef } from "react"

import InputErrorMessage from "./InputErrorMessage;"
import InputLabel from "./InputLabel"

const Input = forwardRef(({ label, errorMessage, ...rest }, ref) => {
  return (
    <div className="flex flex-col space-y-1 text-left">
      <InputLabel htmlFor={rest.id} name={rest.name}>
        {label}
      </InputLabel>
      <input
        className="rounded-lg border border-solid border-brend-border px-4 py-3 outline-brend-primary placeholder:text-sm placeholder:text-brend-lightGrey"
        ref={ref}
        {...rest}
      />
      {errorMessage && <InputErrorMessage>{errorMessage}</InputErrorMessage>}
    </div>
  )
})

Input.displayName = "Input"
Input.propTypes = {
  id: PropTypes.string.isRequired,
  name: PropTypes.string.isRequired,
  label: PropTypes.string.isRequired,
  errorMessage: PropTypes.string,
  placeholder: PropTypes.string,
}

export default Input

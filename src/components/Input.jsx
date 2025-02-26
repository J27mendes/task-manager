import { forwardRef } from 'react'

import InputLabel from './InputLabel'

const Input = forwardRef(({ label, errorMessage, ...rest }, ref) => {
  return (
    <div className="flex flex-col space-y-1 text-left">
      <InputLabel htmlFor="rest.id">{label}</InputLabel>
      <input
        className="rounded-lg border border-solid border-[#ECECEC] px-4 py-3 outline-[#00AD85] placeholder:text-sm placeholder:text-[#9A9CF]"
        ref={ref}
        {...rest}
      />
      {errorMessage && (
        <p className="text-left text-xs text-red-500">{errorMessage}</p>
      )}
    </div>
  )
})

Input.displayName = 'Input'

export default Input

const Input = ({ label, ...rest }) => {
  return (
    <div className="text-lef flex flex-col space-y-1">
      <label className="text-sm font-semibold text-[#35383E]" htmlFor={rest.id}>
        {label}
      </label>
      <input
        className="rounded-lg border border-solid border-[#ECECEC] px-4 py-3 outline-[#00AD85] placeholder:text-sm placeholder:text-[#9A9CF]"
        {...rest}
      />
    </div>
  )
}

export default Input

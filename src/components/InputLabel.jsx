const InputLabel = (props) => {
  return (
    <label className="text-sm font-semibold text-[#35383E]" htmlFor={props.id}>
      {props.children}
    </label>
  )
}
export default InputLabel

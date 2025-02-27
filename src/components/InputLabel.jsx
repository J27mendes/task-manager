const InputLabel = (props) => {
  return (
    <label
      className="text-sm font-semibold text-brend-darkGrey"
      htmlFor={props.id}
    >
      {props.children}
    </label>
  )
}
export default InputLabel

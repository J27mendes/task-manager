import PropTypes from 'prop-types'

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

InputLabel.PropTypes = {
  children: PropTypes.node.isRequired,
}
export default InputLabel

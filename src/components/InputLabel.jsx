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

InputLabel.propTypes = {
  children: PropTypes.node.isRequired,
}
export default InputLabel

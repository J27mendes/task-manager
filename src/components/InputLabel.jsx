import PropTypes from "prop-types"

const InputLabel = ({ htmlFor, children }) => {
  return (
    <label
      htmlFor={htmlFor}
      className="text-sm font-semibold text-brend-darkGrey"
    >
      {children}
    </label>
  )
}

InputLabel.propTypes = {
  htmlFor: PropTypes.string.isRequired,
  children: PropTypes.node.isRequired,
}
export default InputLabel

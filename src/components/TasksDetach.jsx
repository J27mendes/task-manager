import PropTypes from "prop-types"

const TasksDetach = ({ icon, text }) => {
  return (
    <div className="flex gap-2 border-b border-solid border-brend-divider pb-1">
      {icon}
      <p className="text-sm text-brend-time">{text}</p>
    </div>
  )
}

TasksDetach.prototype = {
  text: PropTypes.string.isRequired,
  icon: PropTypes.element.isRequired,
}

export default TasksDetach

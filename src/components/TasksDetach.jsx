const TasksDetach = ({ icon, text }) => {
  return (
    <div className="flex gap-2 border-b border-solid border-brend-divider pb-1">
      {icon}
      <p className="text-sm text-brend-time">{text}</p>
    </div>
  )
}

export default TasksDetach

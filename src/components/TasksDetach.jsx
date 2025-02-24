const TasksDetach = ({ icon, text }) => {
  return (
    <div className="flex gap-2 border-b border-solid border-[#F4F4F5] pb-1">
      {icon}
      <p className="text-sm text-[#9A7C9F]">{text}</p>
    </div>
  )
}

export default TasksDetach

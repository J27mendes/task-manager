const TaskItem = ({ task }) => {
  const getStatusClasses = () => {
    if (task.status === 'done') {
      return 'bg-[#00AD85] bg-opacity-10 text-[#00AD85]'
    }

    if (task.status === 'in_progress') {
      return 'bg-[#FFAA04] bg-opacity-10 text-[#FFAA04]'
    }

    if (task.status === 'not_started') {
      return 'bg-[#fE5A99] bg-opacity-10 text-[#fE5A99]'
    }
  }
  return (
    <div
      className={`flex items-center gap-2 rounded-lg px-4 py-3 text-sm ${getStatusClasses()}`}
    >
      {task.title}
    </div>
  )
}

export default TaskItem

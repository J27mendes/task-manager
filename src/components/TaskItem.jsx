import Check from '../assets/icons/check.svg?react'
import Loader from '../assets/icons/loader.svg?react'
import Closed from '../assets/icons/closed.svg?react'
import Details from '../assets/icons/details.svg?react'

const TaskItem = ({ task }) => {
  const getStatusClasses = () => {
    if (task.status === 'done') {
      return 'bg-[#00AD85] text-[#00AD85]'
    }

    if (task.status === 'in_progress') {
      return 'bg-[#FFAA04] text-[#FFAA04]'
    }

    if (task.status === 'not_started') {
      return 'bg-[#fE5A99] text-[#fE5A99]'
    }
  }
  return (
    <div
      className={`flex items-center justify-between rounded-lg bg-opacity-10 px-4 py-3 text-sm ${getStatusClasses()}`}
    >
      <div className="flex items-center gap-2">
        {' '}
        <label
          className={`relative flex h-7 w-7 cursor-pointer items-center justify-center rounded-lg ${getStatusClasses()}`}
        >
          <input
            type="checkbox"
            checked={task.status === 'done'}
            className="absolute h-full w-full cursor-pointer opacity-0"
          />
          {task.status === 'done' && <Check className="animate-bounce" />}
          {task.status === 'in_progress' && <Loader className="animate-spin" />}
          {task.status === 'not_started' && (
            <Closed className="animate-pulse" />
          )}
        </label>
        {task.title}
      </div>
      <a
        href="#"
        className="transition-opacity hover:animate-ping hover:opacity-80"
      >
        <Details />
      </a>
    </div>
  )
}

export default TaskItem

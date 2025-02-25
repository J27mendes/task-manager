import {
  CheckIcon,
  LoaderIcon,
  ClosedIcon,
  DetailsIcon,
  TrashIcon,
} from '../assets/icons'
import Button from './Button'

const TaskItem = ({ task, handleCheckboxChange, handleDeleteClick }) => {
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
      className={`flex items-center justify-between rounded-lg bg-opacity-10 px-4 py-3 text-sm transition ${getStatusClasses()}`}
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
            onChange={() => handleCheckboxChange(task.id)}
          />
          {task.status === 'done' && <CheckIcon className="animate-bounce" />}
          {task.status === 'in_progress' && (
            <LoaderIcon className="animate-spin" />
          )}
          {task.status === 'not_started' && (
            <ClosedIcon className="animate-pulse" />
          )}
        </label>
        {task.title}
      </div>
      <div className="flex items-center gap-2">
        <Button variant="ghost" onClick={() => handleDeleteClick(task.id)}>
          <TrashIcon className="text-[#fE5A99]" />
        </Button>
        <a href="#" className="transition-opacity hover:opacity-80">
          <DetailsIcon className="transition-transform duration-500 hover:scale-150" />
        </a>
      </div>
    </div>
  )
}

export default TaskItem

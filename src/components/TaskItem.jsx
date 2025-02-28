import PropTypes from 'prop-types'
import { useState } from 'react'
import { toast } from 'sonner'

import {
  CheckIcon,
  ClosedIcon,
  DetailsIcon,
  LoaderIcon,
  TrashIcon,
} from '../assets/icons'
import Button from './Button'

const TaskItem = ({ task, handleCheckboxChange, onDeleteSuccess }) => {
  const [deleteIsLoading, setDeleteIsLoading] = useState(false)

  const handleDeleteClick = async () => {
    setDeleteIsLoading(true)
    const response = await fetch(
      `http://localhost:3000/TaskManager/${task.id}`,
      {
        method: 'DELETE',
      }
    )

    if (!response.ok) {
      setDeleteIsLoading(false)
      return toast.success(
        'Erro ao deletar a tarefa, por favor tente novamente',
        {
          style: {
            background: '#f5202b',
            color: '#fff',
            fontSize: '20px',
            justifyContent: 'center',
          },
        }
      )
    }
    onDeleteSuccess(task.id)
    setDeleteIsLoading(false)
  }

  const getStatusClasses = () => {
    if (task.status === 'done') {
      return 'bg-brend-primary text-brend-primary'
    }

    if (task.status === 'in_progress') {
      return 'bg-brend-progress text-brend-progress'
    }

    if (task.status === 'not_started') {
      return 'bg-brend-notStarted text-brend-notStarted'
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
            <LoaderIcon className="animate-spin text-brend-secundary" />
          )}
          {task.status === 'not_started' && (
            <ClosedIcon className="animate-pulse" />
          )}
        </label>
        {task.title}
      </div>
      <div className="flex items-center gap-2">
        <Button
          color="ghost"
          onClick={handleDeleteClick}
          disabled={deleteIsLoading}
        >
          {deleteIsLoading ? (
            <LoaderIcon className="animate-spin text-brend-lightGrey" />
          ) : (
            <TrashIcon className="text-brend-notStarted" />
          )}
        </Button>
        <a href="#" className="transition-opacity hover:opacity-80">
          <DetailsIcon className="transition-transform duration-500 hover:scale-150" />
        </a>
      </div>
    </div>
  )
}

TaskItem.propTypes = {
  task: PropTypes.shape({
    id: PropTypes.number.isRequired,
    title: PropTypes.string.isRequired,
    description: PropTypes.string.isRequired,
    time: PropTypes.oneOf(['morning', 'afternoon', 'evening']).isRequired,
    status: PropTypes.oneOf(['done', 'in_progress', 'not_started']).isRequired,
  }),
  handleCheckboxChange: PropTypes.func.isRequired,
  onDeleteSuccess: PropTypes.func.isRequired,
}

export default TaskItem

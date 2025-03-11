import PropTypes from "prop-types"
import { Link } from "react-router-dom"

import {
  CheckIcon,
  ClosedIcon,
  DetailsIcon,
  LoaderIcon,
  TrashIcon,
} from "../assets/icons"
import { useDeleteTasks } from "../hooks/data/useDeleteTasks"
import Button from "./Button"

const TaskItem = ({ task, handleCheckboxChange }) => {
  const { mutate, isPending } = useDeleteTasks(task.id)

  const handleDeleteClick = () => {
    mutate()
  }

  const getStatusClasses = () => {
    if (task.status === "done") {
      return "bg-brend-primary text-brend-primary"
    }

    if (task.status === "in_progress") {
      return "bg-brend-progress text-brend-progress"
    }

    if (task.status === "not_started") {
      return "bg-brend-notStarted text-brend-notStarted"
    }
  }
  return (
    <div
      className={`flex items-center justify-between rounded-lg bg-opacity-10 px-4 py-3 text-sm transition ${getStatusClasses()}`}
    >
      <div className="flex items-center gap-2">
        {" "}
        <label
          htmlFor={`task-${task.id}`}
          className={`relative flex h-7 w-7 cursor-pointer items-center justify-center rounded-lg ${getStatusClasses()}`}
        >
          <input
            type="checkbox"
            id={`task-${task.id}`}
            name={`task-${task.id}`}
            checked={task.status === "done"}
            className="absolute h-full w-full cursor-pointer opacity-0"
            onChange={() => handleCheckboxChange(task.id)}
          />
          {task.status === "done" && <CheckIcon className="animate-bounce" />}
          {task.status === "in_progress" && (
            <LoaderIcon className="animate-spin text-brend-secundary" />
          )}
          {task.status === "not_started" && (
            <ClosedIcon className="animate-pulse text-brend-secundary" />
          )}
        </label>
        {task.title}
      </div>
      <div className="flex items-center gap-2">
        <Button color="ghost" onClick={handleDeleteClick} disabled={isPending}>
          {isPending ? (
            <LoaderIcon className="animate-spin text-brend-lightGrey" />
          ) : (
            <TrashIcon className="text-brend-notStarted" />
          )}
        </Button>
        <Link to={`/TaskManager/${task.id}`}>
          <DetailsIcon className="transition-transform duration-500 hover:scale-150" />
        </Link>
      </div>
    </div>
  )
}

TaskItem.propTypes = {
  task: PropTypes.shape({
    id: PropTypes.string.isRequired,
    title: PropTypes.string.isRequired,
    description: PropTypes.string.isRequired,
    time: PropTypes.oneOf(["morning", "afternoon", "evening"]).isRequired,
    status: PropTypes.oneOf(["done", "in_progress", "not_started"]).isRequired,
  }),
  handleCheckboxChange: PropTypes.func.isRequired,
}

export default TaskItem

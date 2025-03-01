import { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'

const TaskDetailsPage = () => {
  const { taskId } = useParams()
  const [task, setTask] = useState()

  useEffect(() => {
    const fetchTask = async () => {
      const response = await fetch(
        `http://localhost:3000/TaskManager/${taskId}`,
        { method: 'GET' }
      )
      const data = await response.json()
      setTask(data)
    }
    fetchTask()
  }, [taskId])
  return (
    <div>
      <h1>{task?.title}</h1>
      <h1>{task?.description}</h1>
      <h1>{task?.time}</h1>
    </div>
  )
}

export default TaskDetailsPage

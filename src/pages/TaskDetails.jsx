import { useEffect, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom'

import { ArrowLeftIcon, ChevronRightIcon, TrashIcon } from '../assets/icons'
import Button from '../components/Button'
import Input from '../components/Input'
import SelectTime from '../components/SelectTime'
import Sidebar from '../components/Sidebar'

const TaskDetailsPage = () => {
  const { taskId } = useParams()
  const [task, setTask] = useState()
  const navigate = useNavigate()
  const handleBackClick = () => {
    navigate(-1)
  }

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
    <div className="flex">
      <Sidebar />
      <div className="w-full space-y-6 px-8 py-16">
        <div className="flex w-full justify-between">
          <div>
            <button
              className="mb-3 flex h-8 w-8 items-center justify-center rounded-full bg-brend-primary"
              onClick={handleBackClick}
            >
              <ArrowLeftIcon />
            </button>
            <div className="flex items-center gap-1 text-xs">
              <span
                className="cursor-pointer text-brend-grey"
                onClick={handleBackClick}
              >
                Minhas Tarefas
              </span>
              <ChevronRightIcon className="text-brend-grey" />
              <span className="font-semibold text-brend-primary">
                {task?.title}
              </span>
            </div>
            <h1 className="mt=2 text-xl font-semibold">{task?.title}</h1>
          </div>
          <Button className="h-fit self-end" color="danger">
            <TrashIcon />
            Deletar Tarefa
          </Button>
        </div>
        <div className="space-y-6 rounded-xl bg-white p-6">
          <div>
            <Input id="titulo" label="Nome" value={task?.title} />
          </div>
          <div>
            <SelectTime value={task?.time} />
          </div>
          <div>
            <Input
              id="description"
              label="Descrição"
              value={task?.description}
            />
          </div>
          <div className="flex w-full justify-end gap-3">
            <Button size="medium" color="secundary">
              Cancelar
            </Button>
            <Button size="medium">Salvar</Button>
          </div>
        </div>
      </div>
    </div>
  )
}

export default TaskDetailsPage

import { useEffect, useRef, useState } from 'react'
import { Link, useNavigate, useParams } from 'react-router-dom'
import { toast } from 'sonner'

import {
  ArrowLeftIcon,
  ChevronRightIcon,
  LoaderIcon,
  TrashIcon,
} from '../assets/icons'
import Button from '../components/Button'
import Input from '../components/Input'
import SelectTime from '../components/SelectTime'
import Sidebar from '../components/Sidebar'

const TaskDetailsPage = () => {
  const { taskId } = useParams()
  const [task, setTask] = useState()
  const [errors, setErrors] = useState([])
  const [saveLoading, setSaveLoading] = useState(false)
  const navigate = useNavigate()

  const titleRef = useRef()
  const timeRef = useRef()
  const descriptionRef = useRef()
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

  const handleSaveClick = async () => {
    const title = titleRef.current.value
    const time = timeRef.current.value
    const description = descriptionRef.current.value

    const newErrors = []
    if (!title.trim()) {
      newErrors.push({
        inputName: 'title',
        message: 'O titulo é obrigatório.',
      })
    }
    if (!time.trim()) {
      newErrors.push({
        inputName: 'time',
        message: 'Selecione o horário desejado.',
      })
    }
    if (!description.trim()) {
      newErrors.push({
        inputName: 'description',
        message: 'A descrição é obrigatória.',
      })
    }

    setErrors(newErrors)
    if (newErrors.length > 0) {
      setSaveLoading(false)
      return
    }

    setSaveLoading(true)
    const response = await fetch(
      `http://localhost:3000/TaskManager/${task.id}`,
      {
        method: 'PATCH',
        body: JSON.stringify({
          title,
          time,
          description,
        }),
      }
    )

    if (!response.ok) {
      toast.success('Erro ao atualizar a tarefa, por favor tente novamente', {
        style: {
          background: '#f5202b',
          color: '#fff',
          fontSize: '20px',
          justifyContent: 'center',
        },
      })
      return setSaveLoading(false)
    }
    const updateTask = await response.json()
    setTask(updateTask)
    setSaveLoading(false)
    toast.success('Tarefa atualizada com sucesso', {
      style: {
        color: '#00AD85',
        fontSize: '20px',
        justifyContent: 'center',
      },
    })
  }

  const titleError = errors.find((error) => error.inputName === 'title')
  const timeError = errors.find((error) => error.inputName === 'time')
  const descriptionError = errors.find(
    (error) => error.inputName === 'description'
  )

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
              <Link className="cursor-pointer text-brend-grey" to={'/'}>
                Minhas Tarefas
              </Link>
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
            <Input
              id="titulo"
              label="Nome"
              defaultValue={task?.title}
              disabled={saveLoading}
              ref={titleRef}
              errorMessage={titleError?.message}
            />
          </div>
          <div>
            <SelectTime
              defaultValue={task?.time}
              ref={timeRef}
              errorMessage={timeError?.message}
              disabled={saveLoading}
            />
          </div>
          <div>
            <Input
              id="description"
              label="Descrição"
              defaultValue={task?.description}
              errorMessage={descriptionError?.message}
              ref={descriptionRef}
              disabled={saveLoading}
            />
          </div>
          <div className="flex w-full justify-end gap-3">
            <Button
              size="medium"
              onClick={handleSaveClick}
              disabled={saveLoading}
            >
              {saveLoading && <LoaderIcon className="animate-spin" />}
              Salvar
            </Button>
          </div>
        </div>
      </div>
    </div>
  )
}

export default TaskDetailsPage

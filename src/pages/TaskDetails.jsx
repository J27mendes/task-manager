import { useEffect, useState } from 'react'
import { useForm } from 'react-hook-form'
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
  const navigate = useNavigate()
  const {
    register,
    formState: { errors, isSubmitting },
    handleSubmit,
    reset,
  } = useForm()

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
      reset(data)
    }
    fetchTask()
  }, [taskId, reset])

  const handleSaveClick = async (data) => {
    const response = await fetch(
      `http://localhost:3000/TaskManager/${task.id}`,
      {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          title: data.title.trim(),
          time: data.time,
          description: data.description.trim(),
        }),
      }
    )
    if (!response.ok) {
      return toast.error(
        'Erro ao atualizar a tarefa, por favor tente novamente',
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

    toast.success('Tarefa atualizada com sucesso', {
      style: {
        color: '#00AD85',
        fontSize: '20px',
        justifyContent: 'center',
      },
    })
  }

  const handleDeleteClick = async () => {
    const response = await fetch(
      `http://localhost:3000/TaskManager/${task.id}`,
      {
        method: 'DELETE',
      }
    )

    if (!response.ok) {
      return toast.error(
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
    toast.success('Tarefa deletada com sucesso', {
      style: {
        color: '#f5202b',
        fontSize: '20px',
        justifyContent: 'center',
      },
    })
    navigate(-1)
  }

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
          <Button
            className="h-fit self-end"
            color="danger"
            onClick={handleDeleteClick}
          >
            <TrashIcon />
            Deletar Tarefa
          </Button>
        </div>
        <form onSubmit={handleSubmit(handleSaveClick)}>
          <div className="space-y-6 rounded-xl bg-white p-6">
            <div>
              <Input
                id="titulo"
                label="Nome"
                disabled={isSubmitting}
                {...register('title', {
                  require: 'O titulo é obrigatório!',
                  validate: (value) => {
                    if (!value.trim()) {
                      return 'O titulo não pode estar vázio'
                    }
                    return true
                  },
                })}
                errorMessage={errors?.title?.message}
              />
            </div>
            <div>
              <SelectTime
                errorMessage={errors?.time?.message}
                disabled={isSubmitting}
                {...register('time', {
                  required: true,
                })}
              />
            </div>
            <div>
              <Input
                id="description"
                label="Descrição"
                errorMessage={errors?.description?.message}
                {...register('description', {
                  required: 'A descrição é obrigatória!',
                })}
                disabled={isSubmitting}
              />
            </div>
            <div className="flex w-full justify-end gap-3">
              <Button size="medium" type="submit" disabled={isSubmitting}>
                {isSubmitting && <LoaderIcon className="animate-spin" />}
                Salvar
              </Button>
            </div>
          </div>
        </form>
      </div>
    </div>
  )
}

export default TaskDetailsPage

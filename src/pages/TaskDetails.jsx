import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query'
import { useForm } from 'react-hook-form'
import { Link, useNavigate, useParams } from 'react-router-dom'

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
import { errorToast, successToast } from '../utils'

const TaskDetailsPage = () => {
  const { taskId } = useParams()
  const navigate = useNavigate()
  const queryClient = useQueryClient()
  const {
    register,
    formState: { errors },
    handleSubmit,
    reset,
  } = useForm()

  const { mutate: deleteTask, isPending: deleteTaskIsLoading } = useMutation({
    mutationKey: ['deleteTask', taskId],
    mutationFn: async () => {
      const response = await fetch(
        `http://localhost:3000/TaskManager/${taskId}`,
        {
          method: 'DELETE',
        }
      )
      const deletedTask = await response.json()
      queryClient.setQueryData(['task', taskId], (oldTask) => {
        if (!oldTask) {
          return deleteTask
        }

        return { ...oldTask, ...deletedTask }
      })
    },
  })
  const { data: task } = useQuery({
    queryKey: ['task', taskId],
    queryFn: async () => {
      const response = await fetch(
        `http://localhost:3000/TaskManager/${taskId}`,
        { method: 'GET' }
      )
      if (!response.ok) {
        throw new Error()
      }
      const data = await response.json()
      reset(data)
      return data
    },
  })

  const { mutate: updateTask, isPending: updateTaskIsLoading } = useMutation({
    mutationKey: ['updateTask', taskId],
    mutationFn: async (data) => {
      const response = await fetch(
        `http://localhost:3000/TaskManager/${taskId}`,
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
        throw new Error()
      }
      const updatedTask = await response.json()

      queryClient.setQueryData(['task', taskId], (oldTask) => {
        if (!oldTask) {
          return updatedTask
        }

        return { ...oldTask, ...updatedTask }
      })
    },
  })

  const handleBackClick = () => {
    navigate(-1)
  }

  const handleSaveClick = async (data) => {
    updateTask(data, {
      onSuccess: () => {
        successToast('Tarefa atualizada com sucesso!')
        navigate(-1)
      },
      onError: () => {
        errorToast('Erro ao atualizar a tarefa, tente novamente!')
      },
    })
  }

  const handleDeleteClick = async () => {
    deleteTask(undefined, {
      onSuccess: () => {
        successToast('Tarefa deletada com sucesso!')
        navigate(-1)
      },
      onError: () => {
        errorToast('Erro ao deletar a tarefa, por favor tente novamente!')
      },
    })
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
                disabled={deleteTaskIsLoading || updateTaskIsLoading}
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
                disabled={deleteTaskIsLoading || updateTaskIsLoading}
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
                disabled={deleteTaskIsLoading || updateTaskIsLoading}
              />
            </div>
            <div className="flex w-full justify-end gap-3">
              <Button
                size="medium"
                type="submit"
                disabled={deleteTaskIsLoading || updateTaskIsLoading}
              >
                {(deleteTaskIsLoading || updateTaskIsLoading) && (
                  <LoaderIcon className="animate-spin" />
                )}
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

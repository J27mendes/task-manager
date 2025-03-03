import { useQuery, useQueryClient } from '@tanstack/react-query'
import { useState } from 'react'
import { toast } from 'sonner'

import {
  AddIcon,
  CloudsunIcon,
  MoonIcon,
  SunIcon,
  TrashIcon,
} from '../assets/icons'
import AddTaskModal from './AddTaskModal'
import Button from './Button'
import TaskItem from './TaskItem'
import TasksDetach from './TasksDetach'

const Tasks = () => {
  const queryClient = useQueryClient()
  const { data: tasks } = useQuery({
    queryKey: ['TaskManager'],
    queryFn: async () => {
      const response = await fetch('http://localhost:3000/TaskManager', {
        method: 'GET',
      })
      const tasks = await response.json()
      return tasks
    },
  })

  const [openModal, setOpenModal] = useState(false)
  const morningTasks = tasks?.filter((task) => task.time === 'morning')
  const afternoonTasks = tasks?.filter((task) => task.time === 'afternoon')
  const eveningTasks = tasks?.filter((task) => task.time === 'evening')

  const onTaskDeleteSuccess = async (taskId) => {
    queryClient.setQueryData(['TaskManager'], (currentTasks = []) =>
      currentTasks.filter((task) => task.id !== taskId)
    )
    toast.success('Tarefa deletada com sucesso', {
      style: {
        background: '#f5202b',
        color: '#fff',
        fontSize: '20px',
        justifyContent: 'center',
      },
    })
  }
  const handleTaskCheckboxChange = async (taskId) => {
    const taskToUpdate = tasks?.find((task) => task.id === taskId)
    if (!taskToUpdate) return

    let newStatus
    if (taskToUpdate.status === 'not_started') newStatus = 'in_progress'
    else if (taskToUpdate.status === 'in_progress') newStatus = 'done'
    else newStatus = 'not_started'

    const toastMessages = {
      not_started: { text: 'Tarefa não iniciada', color: '#fE5A99' },
      in_progress: { text: 'Tarefa em progresso', color: '#FFAA04' },
      done: { text: 'Tarefa concluída', color: '#00AD85' },
    }

    toast.success(toastMessages[newStatus].text, {
      style: {
        color: toastMessages[newStatus].color,
        fontSize: '20px',
        justifyContent: 'center',
      },
    })

    try {
      await fetch(`http://localhost:3000/TaskManager/${taskId}`, {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ status: newStatus }),
      })
      queryClient.setQueryData(['TaskManager'], (currentTasks = []) =>
        currentTasks.map((task) =>
          task.id === taskId ? { ...task, status: newStatus } : task
        )
      )
    } catch (error) {
      toast.error('Erro ao atualizar a tarefa')
    }
  }

  const handleAddTask = async (nextTask) => {
    queryClient.setQueryData(['TaskManager'], (currentTasks = []) => {
      return [...currentTasks, nextTask]
    })
    toast.success('Tarefa adicionada com sucesso', {
      style: {
        color: '#00AD85',
        fontSize: '20px',
        justifyContent: 'center',
      },
    })
  }

  const handleTaskError = () => {
    return toast.success(
      'Erro ao adicionar tarefa, por favor tente novamente',
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

  return (
    <div className="w-full space-y-6 px-8 py-16">
      <div className="flex w-full justify-between">
        <div>
          <span className="text-xs font-semibold text-brend-primary">
            Minhas Tarefas
          </span>
          <h2 className="text-xl font-semibold">Minhas Tarefas</h2>
        </div>
        <div className="flex items-center gap-3">
          <Button color={'ghost'}>
            Limpar Tarefas <TrashIcon />
          </Button>
          <Button color={'primary'} onClick={() => setOpenModal(true)}>
            <AddIcon />
            Nova Tarefa
          </Button>
          <AddTaskModal
            isOpen={openModal}
            handleClose={() => setOpenModal(false)}
            onSubmitSuccess={handleAddTask}
            onSubmitError={handleTaskError}
          />
        </div>
      </div>
      <div className="rounded-xl bg-white p-6">
        <div className="space-y-3">
          <TasksDetach text={'Manhã'} icon={<SunIcon />} />
          {morningTasks?.length === 0 && (
            <p className="text-sm text-brend-time">
              Nenhuma tarefa cadastrada para o periodo da manhã
            </p>
          )}
          {morningTasks?.map((task) => (
            <TaskItem
              task={task}
              key={task.id}
              handleCheckboxChange={handleTaskCheckboxChange}
              onDeleteSuccess={onTaskDeleteSuccess}
            />
          ))}
        </div>
        <div className="my-6 space-y-3">
          <TasksDetach text={'Tarde'} icon={<CloudsunIcon />} />
          {afternoonTasks?.length === 0 && (
            <p className="text-sm text-brend-time">
              Nenhuma tarefa cadastrada para o periodo da tarde
            </p>
          )}
          {afternoonTasks?.map((task) => (
            <TaskItem
              task={task}
              key={task.id}
              handleCheckboxChange={handleTaskCheckboxChange}
              onDeleteSuccess={onTaskDeleteSuccess}
            />
          ))}
        </div>
        <div className="space-y-3">
          <TasksDetach text={'Noite'} icon={<MoonIcon />} />
          {eveningTasks?.length === 0 && (
            <p className="text-sm text-brend-time">
              Nenhuma tarefa cadastrada para o periodo da noite
            </p>
          )}
          {eveningTasks?.map((task) => (
            <TaskItem
              task={task}
              key={task.id}
              handleCheckboxChange={handleTaskCheckboxChange}
              onDeleteSuccess={onTaskDeleteSuccess}
            />
          ))}
        </div>
      </div>
    </div>
  )
}

export default Tasks

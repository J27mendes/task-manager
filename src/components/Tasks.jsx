import { useState } from 'react'
import { toast } from 'sonner'

import {
  AddIcon,
  CloudsunIcon,
  MoonIcon,
  SunIcon,
  TrashIcon,
} from '../assets/icons'
import TaskManager from '../constants/taskManager'
import Button from './Button'
import TaskItem from './TaskItem'
import TasksDetach from './TasksDetach'

const Tasks = () => {
  const [tasks, SetTasks] = useState(TaskManager)
  const morningTasks = tasks.filter((task) => task.time === 'morning')
  const afternoonTasks = tasks.filter((task) => task.time === 'afternoon')
  const eveningTasks = tasks.filter((task) => task.time === 'evening')
  const handleTaskDeleteClick = (taskId) => {
    const newTasks = tasks.filter((task) => task.id !== taskId)
    toast.success('Tarefa deletada com sucesso', {
      style: {
        background: '#f5202b',
        color: '#fff',
        fontSize: '20px',
        justifyContent: 'center',
      },
    })
    return SetTasks(newTasks)
  }
  const handleTaskCheckboxChange = (taskId) => {
    const newTasks = tasks.map((task) => {
      if (task.id !== taskId) {
        return task
      }
      if (task.status === 'not_started') {
        toast.success('Tarefa em progresso', {
          style: {
            color: '#FFAA04',
            fontSize: '20px',
            justifyContent: 'center',
          },
        })
        return { ...task, status: 'in_progress' }
      }
      if (task.status === 'in_progress') {
        toast.success('Tarefa concluida', {
          style: {
            color: '#00AD85',
            fontSize: '20px',
            justifyContent: 'center',
          },
        })
        return { ...task, status: 'done' }
      }
      if (task.status === 'done') {
        toast.success('Tarefa não iniciada', {
          style: {
            color: '#fE5A99',
            fontSize: '20px',
            justifyContent: 'center',
          },
        })
        return { ...task, status: 'not_started' }
      }

      return task
    })
    SetTasks(newTasks)
  }

  return (
    <div className="w-full space-y-6 px-8 py-16">
      <div className="flex w-full justify-between">
        <div>
          <span className="text-xs font-semibold text-[#00AD85]">
            Minhas Tarefas
          </span>
          <h2 className="text-xl font-semibold">Minhas Tarefas</h2>
        </div>
        <div className="flex items-center gap-3">
          <Button variant={'ghost'}>
            Limpar Tarefas <TrashIcon />
          </Button>
          <Button variant={'primary'}>
            <AddIcon />
            Nova Tarefa
          </Button>
        </div>
      </div>
      <div className="rounded-xl bg-white p-6">
        <div className="space-y-3">
          <TasksDetach text={'Manhã'} icon={<SunIcon />} />
          {morningTasks.map((task) => (
            <TaskItem
              task={task}
              key={task.id}
              handleCheckboxChange={handleTaskCheckboxChange}
              handleDeleteClick={handleTaskDeleteClick}
            />
          ))}
        </div>
        <div className="my-6 space-y-3">
          <TasksDetach text={'Tarde'} icon={<CloudsunIcon />} />
          {afternoonTasks.map((task) => (
            <TaskItem
              task={task}
              key={task.id}
              handleCheckboxChange={handleTaskCheckboxChange}
              handleDeleteClick={handleTaskDeleteClick}
            />
          ))}
        </div>
        <div className="space-y-3">
          <TasksDetach text={'Noite'} icon={<MoonIcon />} />
          {eveningTasks.map((task) => (
            <TaskItem
              task={task}
              key={task.id}
              handleCheckboxChange={handleTaskCheckboxChange}
              handleDeleteClick={handleTaskDeleteClick}
            />
          ))}
        </div>
      </div>
    </div>
  )
}

export default Tasks

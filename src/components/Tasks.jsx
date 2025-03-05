import { useState } from 'react'
import { toast } from 'sonner'

import {
  AddIcon,
  CloudsunIcon,
  MoonIcon,
  SunIcon,
  TrashIcon,
} from '../assets/icons'
import { useClearTasks } from '../hooks/data/useClearTasks'
import { useGetTasks } from '../hooks/data/useGetTasks'
import { useUpdateTask } from '../hooks/data/useUpdateTask'
import { toastMessages } from '../utils'
import AddTaskModal from './AddTaskModal'
import Button from './Button'
import TaskItem from './TaskItem'
import TasksDetach from './TasksDetach'

const Tasks = () => {
  const { data: tasks } = useGetTasks()
  const [openModal, setOpenModal] = useState(false)
  const morningTasks = tasks?.filter((task) => task.time === 'morning')
  const afternoonTasks = tasks?.filter((task) => task.time === 'afternoon')
  const eveningTasks = tasks?.filter((task) => task.time === 'evening')
  const { mutate, isPending } = useUpdateTask()
  const { mutate: clearTasks } = useClearTasks()

  const handleTaskCheckboxChange = async (taskId) => {
    const taskToUpdate = tasks?.find((task) => task.id === taskId)
    if (!taskToUpdate) return

    let newStatus
    if (taskToUpdate.status === 'not_started') newStatus = 'in_progress'
    else if (taskToUpdate.status === 'in_progress') newStatus = 'done'
    else newStatus = 'not_started'

    toast.success(toastMessages[newStatus].text, {
      style: {
        color: toastMessages[newStatus].color,
        fontSize: '20px',
        justifyContent: 'center',
      },
    })
    mutate({ taskId, newStatus })
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
          <Button color={'ghost'} onClick={clearTasks}>
            Limpar Tarefas <TrashIcon />
          </Button>
          <Button color={'primary'} onClick={() => setOpenModal(true)}>
            <AddIcon />
            Nova Tarefa
          </Button>
          <AddTaskModal
            isOpen={openModal}
            handleClose={() => setOpenModal(false)}
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
              disabled={isPending}
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
              disabled={isPending}
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
            />
          ))}
        </div>
      </div>
    </div>
  )
}

export default Tasks

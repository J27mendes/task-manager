import { toast } from 'sonner'

import { CloudsunIcon, MoonIcon, SunIcon } from '../assets/icons'
import { useClearTasks } from '../hooks/data/useClearTasks'
import { useGetTasks } from '../hooks/data/useGetTasks'
import { useUpdateTask } from '../hooks/data/useUpdateTask'
import { toastMessages } from '../utils'
import Header from './Header'
import TaskItem from './TaskItem'
import TasksDetach from './TasksDetach'

const Tasks = () => {
  const { data: tasks } = useGetTasks()
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

    mutate(
      { taskId, newStatus },
      {
        onSuccess: () => {
          toast.success(toastMessages[newStatus].text, {
            style: {
              color: toastMessages[newStatus].color,
              fontSize: '20px',
              justifyContent: 'center',
            },
          })
        },
      }
    )
  }

  return (
    <div className="w-full space-y-6 px-8 py-16">
      <Header
        subtitle={'Minhas Tarefas'}
        title={'Minhas Tarefas'}
        clearTasks={clearTasks}
      />
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

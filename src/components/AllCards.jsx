import { ClosedIcon, ListIcon, LoaderIcon, TasksIcon } from '../assets/icons'
import { useGetTasks } from '../hooks/data/useGetTasks'
import DashboardCard from './DashboardCard'

const AllCards = () => {
  const { data: tasks } = useGetTasks()
  const completedTasks = tasks?.filter((task) => task.status === 'done').length
  const inProgressTasks = tasks?.filter(
    (task) => task.status === 'in_progress'
  ).length
  const notStartedTasks = tasks?.filter(
    (task) => task.status === 'in_progress'
  ).length
  return (
    <div className="grid grid-cols-4 gap-9">
      <DashboardCard
        icon={<ListIcon />}
        primaryText={tasks?.length}
        secundaryText={'Tarefas disponiveis'}
      />
      <DashboardCard
        icon={<TasksIcon />}
        primaryText={completedTasks}
        secundaryText={'Tarefas concluídas'}
      />
      <DashboardCard
        icon={<LoaderIcon className="h-5 w-5" />}
        primaryText={inProgressTasks}
        secundaryText={'Tarefas em andamento'}
      />
      <DashboardCard
        icon={<ClosedIcon className="text-brend-primary" />}
        primaryText={notStartedTasks}
        secundaryText={'Tarefas não iniciadas'}
      />
    </div>
  )
}
export default AllCards

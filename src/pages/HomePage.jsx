import {
  GlassWaterIcon,
  ListIcon,
  LoaderIcon,
  TasksIcon,
} from '../assets/icons'
import DashboardCard from '../components/DashboardCard'
import Header from '../components/Header'
import Sidebar from '../components/Sidebar'
import { useClearTasks } from '../hooks/data/useClearTasks'
import { useGetTasks } from '../hooks/data/useGetTasks'

const HomePage = () => {
  const { mutate: clearTasks } = useClearTasks()
  const { data: tasks } = useGetTasks()
  const completedTasks = tasks?.filter((task) => task.status === 'done').length
  const inProgressTasks = tasks?.filter(
    (task) => task.status === 'in_progress'
  ).length
  return (
    <div className="flex">
      <Sidebar />
      <div className="w-full space-y-6 px-8 py-16">
        <Header subtitle={'Início'} title={'Início'} clearTasks={clearTasks} />
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
            icon={<LoaderIcon />}
            primaryText={inProgressTasks}
            secundaryText={'Tarefas em andamento'}
          />
          <DashboardCard
            icon={<GlassWaterIcon />}
            primaryText={'2'}
            secundaryText={'Água'}
          />
        </div>
      </div>
    </div>
  )
}
export default HomePage

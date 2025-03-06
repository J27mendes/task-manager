import { HomeIcon, TasksIcon } from '../assets/icons'
import SidebarButton from './SidebarButton'

const Sidebar = () => {
  return (
    <div className="h-screen w-72 min-w-72 bg-yellow-50">
      <div className="space-y-4 px-8 py-6">
        <h1 className="text-xl font-semibold text-brend-primary">
          Task Manager
        </h1>
        <p>
          Um simples{' '}
          <span className="text-brend-primary">Organizador de tarefas</span>
        </p>
      </div>

      <div className="flex flex-col gap-2 p-2">
        <SidebarButton to={'/'} color="unselected">
          <HomeIcon />
          Início
        </SidebarButton>
        <SidebarButton to={'/TaskManager'} color="selected">
          <TasksIcon />
          Minhas Tarefas
        </SidebarButton>
      </div>
    </div>
  )
}

export default Sidebar

import { HomeIcon, TasksIcon } from '../assets/icons'
import SidebarButton from './SidebarButton'

const Sidebar = () => {
  return (
    <div className="h-screen w-72 bg-yellow-50">
      <div className="space-y-4 px-8 py-6">
        <h1 className="text-xl font-semibold text-[#00AD85]">Task Manager</h1>
        <p>
          Um simples{' '}
          <span className="text-[#00AD85]">Organizador de tarefas</span>
        </p>
      </div>

      <div className="flex flex-col gap-2 p-2">
        <SidebarButton variant="unselected">
          <HomeIcon />
          Início
        </SidebarButton>
        <SidebarButton variant="selected">
          <TasksIcon />
          Minhas Tarefas
        </SidebarButton>
      </div>
    </div>
  )
}

export default Sidebar

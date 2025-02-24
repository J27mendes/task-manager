import Button from './Button'
import Trash from '../assets/icons/trash.svg?react'
import Add from '../assets/icons/Add.svg?react'
import Sun from '../assets/icons/sun.svg?react'
import Cloudsun from '../assets/icons/cloud-sun.svg?react'
import Moon from '../assets/icons/moon.svg?react'
import TasksDetach from './TasksDetach'

const Tasks = () => {
  return (
    <div className="w-full px-8 py-16">
      <div className="flex w-full justify-between">
        <div>
          <span className="text-xs font-semibold text-[#00AD85]">
            Minhas Tarefas
          </span>
          <h2 className="text-xl font-semibold">Minhas Tarefas</h2>
        </div>
        <div className="flex items-center gap-3">
          <Button variant={'ghost'}>
            Limpar Tarefas <Trash />
          </Button>
          <Button variant={'primary'}>
            <Add />
            Nova Tarefa
          </Button>
        </div>
      </div>
      <div className="rounded-xl bg-white p-6">
        <div className="space-y-3">
          <TasksDetach text={'Manhã'} icon={<Sun />} />
        </div>
        <div className="my-3 space-y-6">
          <TasksDetach text={'Tarde'} icon={<Cloudsun />} />
        </div>
        <div className="space-y-3">
          <TasksDetach text={'Noite'} icon={<Moon />} />
        </div>
      </div>
    </div>
  )
}

export default Tasks

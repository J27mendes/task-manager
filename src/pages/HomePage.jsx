import AllCards from '../components/AllCards'
import Header from '../components/Header'
import Sidebar from '../components/Sidebar'
import TaskItem from '../components/TaskItem'
import WeatherCard from '../components/WeatherCard'
import { useClearTasks } from '../hooks/data/useClearTasks'
import { useGetTasks } from '../hooks/data/useGetTasks'
import { useHandleTaskStatusChange } from '../hooks/data/useHandleTaskStatusChange'

const HomePage = () => {
  const { mutate: clearTasks } = useClearTasks()
  const { data: tasks } = useGetTasks()
  const { handleTaskCheckboxChange, isPending } =
    useHandleTaskStatusChange(tasks)

  return (
    <div className="flex">
      <Sidebar />
      <div className="w-full space-y-6 px-8 py-16">
        <Header subtitle={'Início'} title={'Início'} clearTasks={clearTasks} />
        <AllCards />
        <div className="grid grid-cols-[2.5fr_1.5fr]">
          <div className="space-y-6 rounded-[10px] bg-white p-6">
            <div>
              <h3 className="text-xl font-semibold">Tarefas</h3>
              <span className="text-sm text-brend-darkGrey">
                Resumo das Tarefas
              </span>
            </div>
            <div className="space-y-3">
              {tasks?.map((tarefa) => (
                <TaskItem
                  key={tarefa.id}
                  task={tarefa}
                  disabled={isPending}
                  handleCheckboxChange={handleTaskCheckboxChange}
                />
              ))}
            </div>
          </div>
          <WeatherCard />
        </div>
      </div>
    </div>
  )
}

export default HomePage

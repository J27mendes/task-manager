import { createPortal } from 'react-dom'

const AddTaskModal = ({ isOpen }) => {
  if (!isOpen) return null
  return createPortal(
    <div className="fixed inset-0 flex h-screen items-center justify-center backdrop-blur-sm">
      <div className="rounded-xl bg-white p-5 text-center shadow-sm">
        <h2 className="text-xl font-semibold text-[#35383E]">Nova Tarefa</h2>
        <p className="mt-1 text-sm text-[#9A9CF]">
          Insira as informações abaixo
        </p>
      </div>
    </div>,
    document.body
  )
}

export default AddTaskModal

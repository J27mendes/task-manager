import './AddTaskModal.css'

import { useRef } from 'react'
import { createPortal } from 'react-dom'
import { CSSTransition } from 'react-transition-group'

import Button from './Button'
import Input from './Input'

const AddTaskModal = ({ isOpen, handleClose }) => {
  const nodeRef = useRef()
  return createPortal(
    <CSSTransition
      nodeRef={nodeRef}
      in={isOpen}
      timeout={700}
      classNames={'add-task-modal'}
      unmountOnExit
    >
      <div
        ref={nodeRef}
        className="fixed inset-0 flex h-screen items-center justify-center backdrop-blur-sm"
      >
        <div className="rounded-xl bg-white p-5 text-center shadow-sm">
          <h2 className="text-xl font-semibold text-[#35383E]">Nova Tarefa</h2>
          <p className="mb-4 mt-1 text-sm text-[#9A9CF]">
            Insira as informações abaixo
          </p>
          <div className="flex w-[336px] flex-col space-y-4">
            <Input
              id="title"
              label="Titulo"
              placeholder={'Insira o titulo da tarefa'}
            />
            <Input id="time" label="Horário" placeholder={'Horário'} />
            <Input
              id="description"
              label="Descrição"
              placeholder={'Descrição da tarefa'}
            />
            <div className="flex gap-3">
              <Button
                className="w-full"
                variant="secundary"
                size="large"
                onClick={handleClose}
              >
                Cancelar
              </Button>
              <Button className="w-full" size="large">
                Salvar
              </Button>
            </div>
          </div>
        </div>
      </div>
    </CSSTransition>,
    document.body
  )
}

export default AddTaskModal

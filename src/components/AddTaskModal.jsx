import './AddTaskModal.css'

import { useEffect, useRef, useState } from 'react'
import { createPortal } from 'react-dom'
import { CSSTransition } from 'react-transition-group'
import { toast } from 'sonner'
import { v4 } from 'uuid'

import Button from './Button'
import Input from './Input'
import SelectTime from './SelectTime'

const AddTaskModal = ({ isOpen, handleClose, handleSubmit }) => {
  const [title, setTitle] = useState('')
  const [time, setTime] = useState('')
  const [description, setDescription] = useState('')
  const nodeRef = useRef()

  useEffect(() => {
    if (!isOpen) {
      setTitle('')
      setTime('morning')
      setDescription('')
    }
  }, [isOpen])

  const handleSaveClick = () => {
    if (!title.trim() || !time.trim() || !description.trim()) {
      return toast.success('Preencha todos os campos', {
        style: {
          background: '#f5202b',
          color: '#fff',
          fontSize: '20px',
          justifyContent: 'center',
        },
      })
    }
    handleSubmit({
      id: v4(),
      title,
      description,
      time,
      status: 'not_started',
    })
    handleClose()
  }
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
              value={title}
              onChange={(event) => setTitle(event.target.value)}
            />
            <SelectTime
              value={time}
              onChange={(event) => setTime(event.target.value)}
            />
            <Input
              id="description"
              label="Descrição"
              placeholder={'Descrição da tarefa'}
              value={description}
              onChange={(event) => setDescription(event.target.value)}
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
              <Button className="w-full" size="large" onClick={handleSaveClick}>
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

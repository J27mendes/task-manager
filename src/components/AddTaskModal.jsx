import './AddTaskModal.css'

import { useEffect, useRef, useState } from 'react'
import { createPortal } from 'react-dom'
import { CSSTransition } from 'react-transition-group'
// import { toast } from 'sonner'
import { v4 } from 'uuid'

import Button from './Button'
import Input from './Input'
import SelectTime from './SelectTime'

const AddTaskModal = ({ isOpen, handleClose, handleSubmit }) => {
  const [title, setTitle] = useState('')
  const [time, setTime] = useState('')
  const [description, setDescription] = useState('')
  const [errors, setErrors] = useState([])
  const nodeRef = useRef()

  useEffect(() => {
    if (!isOpen) {
      setTitle('')
      setTime('morning')
      setDescription('')
      setErrors([])
    }
  }, [isOpen])

  const handleSaveClick = () => {
    const newErrors = []
    if (!title.trim()) {
      newErrors.push({
        inputName: 'title',
        message: 'O titulo é obrigatório.',
      })
    }
    if (!time.trim()) {
      newErrors.push({
        inputName: 'time',
        message: 'Selecione o horário desejado.',
      })
    }
    if (!description.trim()) {
      newErrors.push({
        inputName: 'description',
        message: 'A descrição é obrigatória.',
      })
    }

    if (newErrors.length > 0) {
      setErrors(newErrors)
      return
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

  const titleError = errors.find((error) => error.inputName === 'title')
  const timeError = errors.find((error) => error.inputName === 'time')
  const descriptionError = errors.find(
    (error) => error.inputName === 'description'
  )

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
              errorMessage={titleError?.message}
            />
            <SelectTime
              value={time}
              onChange={(event) => setTime(event.target.value)}
              errorMessage={timeError?.message}
            />
            <Input
              id="description"
              label="Descrição"
              placeholder={'Descrição da tarefa'}
              value={description}
              onChange={(event) => setDescription(event.target.value)}
              errorMessage={descriptionError?.message}
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

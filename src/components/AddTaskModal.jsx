import './AddTaskModal.css'

import PropTypes from 'prop-types'
import { useEffect, useRef, useState } from 'react'
import { createPortal } from 'react-dom'
import { CSSTransition } from 'react-transition-group'
import { v4 } from 'uuid'

import { LoaderIcon } from '../assets/icons'
import Button from './Button'
import Input from './Input'
import SelectTime from './SelectTime'

const AddTaskModal = ({
  isOpen,
  handleClose,
  onSubmitSuccess,
  onSubmitError,
}) => {
  const [errors, setErrors] = useState([])
  const [loading, setLoading] = useState(false)
  const nodeRef = useRef()
  const titleRef = useRef()
  const timeRef = useRef()
  const descriptionRef = useRef()

  useEffect(() => {
    if (!isOpen) {
      setErrors([])
    }
  }, [isOpen])

  const handleSaveClick = async () => {
    const title = titleRef.current.value
    const time = timeRef.current.value
    const description = descriptionRef.current.value

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

    setErrors(newErrors)
    if (newErrors.length > 0) {
      setLoading(false)
      return
    }
    const bodyTask = {
      id: v4(),
      title,
      time,
      description,
      status: 'not_started',
    }
    setLoading(true)
    const response = await fetch('http://localhost:3000/TaskManager', {
      method: 'POST',
      body: JSON.stringify(bodyTask),
    })

    if (!response.ok) {
      setLoading(false)
      return onSubmitError()
    }

    onSubmitSuccess({
      id: v4(),
      title,
      time,
      description,
      status: 'not_started',
    })
    handleClose()
    setLoading(false)
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
          <h2 className="text-xl font-semibold text-brend-darkGrey">
            Nova Tarefa
          </h2>
          <p className="mb-4 mt-1 text-sm text-brend-lightGrey">
            Insira as informações abaixo
          </p>
          <div className="flex w-[336px] flex-col space-y-4">
            <Input
              id="title"
              label="Titulo"
              placeholder={'Insira o titulo da tarefa'}
              errorMessage={titleError?.message}
              ref={titleRef}
              disabled={loading}
            />
            <SelectTime
              errorMessage={timeError?.message}
              ref={timeRef}
              disabled={loading}
            />
            <Input
              id="description"
              label="Descrição"
              placeholder={'Descrição da tarefa'}
              errorMessage={descriptionError?.message}
              ref={descriptionRef}
              disabled={loading}
            />
            <div className="flex gap-3">
              <Button
                className="w-full"
                color="secundary"
                size="large"
                onClick={handleClose}
              >
                Cancelar
              </Button>
              <Button
                className="w-full"
                size="large"
                onClick={handleSaveClick}
                disabled={loading}
              >
                Salvar
                {loading && (
                  <LoaderIcon
                    className="ml-2 animate-spin text-brend-secundary"
                    style={{ animationDuration: '2s' }}
                  />
                )}
              </Button>
            </div>
          </div>
        </div>
      </div>
    </CSSTransition>,
    document.body
  )
}

AddTaskModal.propTypes = {
  isOpen: PropTypes.bool.isRequired,
  handleClose: PropTypes.func.isRequired,
  onSubmitSuccess: PropTypes.func.isRequired,
}

export default AddTaskModal

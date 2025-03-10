import "./AddTaskModal.css"

import PropTypes from "prop-types"
import { useRef } from "react"
import { createPortal } from "react-dom"
import { useForm } from "react-hook-form"
import { CSSTransition } from "react-transition-group"
import { v4 } from "uuid"

import { LoaderIcon } from "../assets/icons"
import { useAddTask } from "../hooks/data/useAddTask"
import { errorToast, successToast } from "../utils"
import Button from "./Button"
import Input from "./Input"
import SelectTime from "./SelectTime"

const AddTaskModal = ({ isOpen, handleClose }) => {
  const nodeRef = useRef()
  const { mutate, isPending } = useAddTask()
  const {
    register,
    formState: { errors, isSubmitting },
    handleSubmit,
    reset,
  } = useForm({
    defaultValues: {
      title: "",
      time: "morning",
      description: "",
    },
  })
  const handleSaveClick = async (data) => {
    const newTask = {
      id: v4(),
      title: data.title.trim(),
      time: data.time,
      description: data.description.trim(),
      status: "not_started",
    }
    mutate(newTask, {
      onSuccess: () => {
        successToast("Tarefa adicionada com sucesso!")
        reset({
          title: "",
          time: "morning",
          description: "",
        })
        handleClose()
      },
      onError: () => {
        errorToast("Erro ao adicionar tarefa, por favor tente novamente!")
      },
    })
  }

  const handleCancelClick = () => {
    reset({
      title: "",
      time: "morning",
      description: "",
    })
    handleClose()
  }

  return createPortal(
    <CSSTransition
      nodeRef={nodeRef}
      in={isOpen}
      timeout={700}
      classNames={"add-task-modal"}
      unmountOnExit
    >
      <form onSubmit={handleSubmit(handleSaveClick)}>
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
                label="Titulo"
                id="title"
                placeholder={"Insira o titulo da tarefa"}
                errorMessage={errors?.title?.message}
                disabled={isSubmitting}
                {...register("title", {
                  required: "O titulo é obrigatório",
                  validate: (value) => {
                    if (!value.trim()) {
                      return "O titulo não pode estar vázio"
                    }
                    return true
                  },
                })}
              />
              <SelectTime
                errorMessage={errors?.time?.message}
                disabled={isSubmitting}
                {...register("time", {
                  required: true,
                })}
              />
              <Input
                label="Descrição"
                id="description"
                placeholder={"Descrição da tarefa"}
                errorMessage={errors?.description?.message}
                disabled={isSubmitting}
                {...register("description", {
                  required: "A descrição é obrigatória",
                  validate: (value) => {
                    if (!value.trim()) {
                      return "A descrição não pode estar vázia"
                    }
                    return true
                  },
                })}
              />
              <div className="flex gap-3">
                <Button
                  className="w-full"
                  color="secundary"
                  size="large"
                  onClick={handleCancelClick}
                  type="button"
                >
                  Cancelar
                </Button>
                <Button
                  className="w-full"
                  size="large"
                  type="submit"
                  disabled={isSubmitting}
                >
                  Salvar
                  {isPending && (
                    <LoaderIcon
                      className="ml-2 animate-spin text-brend-secundary"
                      style={{ animationDuration: "2s" }}
                    />
                  )}
                </Button>
              </div>
            </div>
          </div>
        </div>
      </form>
    </CSSTransition>,
    document.body
  )
}

AddTaskModal.propTypes = {
  isOpen: PropTypes.bool.isRequired,
  handleClose: PropTypes.func.isRequired,
}

export default AddTaskModal

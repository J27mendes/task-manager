import PropTypes from "prop-types"
import { useState } from "react"

import { AddIcon, TrashIcon } from "../assets/icons"
import AddTaskModal from "./AddTaskModal"
import Button from "./Button"

const Header = ({ subtitle, title, clearTasks }) => {
  const [openModal, setOpenModal] = useState(false)
  return (
    <div className="flex w-full justify-between">
      <div>
        <span className="text-xs font-semibold text-brend-primary">
          {subtitle}
        </span>
        <h2 className="text-xl font-semibold">{title}</h2>
      </div>
      <div className="flex items-center gap-3">
        <Button color={"ghost"} onClick={clearTasks}>
          Limpar Tarefas <TrashIcon />
        </Button>
        <Button color={"primary"} onClick={() => setOpenModal(true)}>
          <AddIcon />
          Nova Tarefa
        </Button>
        <AddTaskModal
          isOpen={openModal}
          handleClose={() => setOpenModal(false)}
        />
      </div>
    </div>
  )
}

Header.propTypes = {
  subtitle: PropTypes.string.isRequired,
  title: PropTypes.string.isRequired,
  clearTasks: PropTypes.func.isRequired,
}

export default Header

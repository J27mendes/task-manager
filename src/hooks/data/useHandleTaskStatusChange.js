import { toast } from "sonner"

import { toastMessages } from "../../utils"
import { useUpdateTask } from "./useUpdateTask"

export const useHandleTaskStatusChange = (tasks) => {
  const { mutate, isPending } = useUpdateTask()

  const handleTaskCheckboxChange = async (taskId) => {
    const taskToUpdate = tasks?.find((task) => task.id === taskId)
    if (!taskToUpdate) return

    let newStatus
    if (taskToUpdate.status === "not_started") newStatus = "in_progress"
    else if (taskToUpdate.status === "in_progress") newStatus = "done"
    else newStatus = "not_started"

    mutate(
      { taskId, newStatus },
      {
        onSuccess: () => {
          toast.success(toastMessages[newStatus].text, {
            style: {
              color: toastMessages[newStatus].color,
              fontSize: "20px",
              justifyContent: "center",
            },
          })
        },
      }
    )
  }

  return { handleTaskCheckboxChange, isPending }
}

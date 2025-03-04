import { toast } from 'sonner'

export const successToast = (message) => {
  toast.success(message, {
    style: {
      color: '#00AD85',
      fontSize: '20px',
      justifyContent: 'center',
    },
  })
}

export const errorToast = (message) => {
  toast.error(message, {
    style: {
      background: '#f5202b',
      color: '#fff',
      fontSize: '20px',
      justifyContent: 'center',
    },
  })
}

export const toastMessages = {
  not_started: { text: 'Tarefa não iniciada', color: '#fE5A99' },
  in_progress: { text: 'Tarefa em progresso', color: '#FFAA04' },
  done: { text: 'Tarefa concluída', color: '#00AD85' },
}

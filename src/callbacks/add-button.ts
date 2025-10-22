import { toggleFormModal } from "../helpers/domHelpers"

export const addButtonCallback = () => {
  const title = document.querySelector('#organizations-form-modal-title')

  if (title instanceof HTMLElement) {
    title.innerText = 'Создание организации'
  }

  toggleFormModal(true)
}
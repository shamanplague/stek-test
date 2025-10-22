export const resetForm = (formId: string) => {
  const form = document.querySelector(`#${formId}`)

  if (form instanceof HTMLFormElement) {
    form.reset()

    const hiddenFields = form.querySelectorAll('input[type="hidden"]')
    hiddenFields.forEach(item => {
      if (item instanceof HTMLInputElement) {
        item.value = ''
      }
    })
  }
}

export const setDisableValueButtonOnForm = (formId: string, value: boolean) => {

  const form = document.querySelector(`#${formId}`)

  if (form instanceof HTMLFormElement) {
    const button = form.querySelector('button[type=submit]')

    if (button instanceof HTMLButtonElement) {

      if (value) {
        button.setAttribute('disabled', 'true')
      } else {
        button.removeAttribute('disabled')
      }
    }
  }
}

export const toggleFormModal = (isOpen: boolean) => {
  const modal = document.getElementById('organizations-form-modal')

  if (modal instanceof HTMLElement) {
    modal.style.display = isOpen ? 'flex' : 'none'
  }

  resetForm('organizations-form')
  setDisableValueButtonOnForm('organizations-form', true)
}
import './style.css'
import { OrganizationsRepositoryFactory } from './repositories/organizations/OrganizationsRepository'
import type { EntityRepositoryFilters, EntityRepositorySorts, SortDirections } from './types/Repository'
import type { OrganizationHeader } from './renderers/types'
import { OrganizationsTableRenderer } from './renderers/OrganizationsTableRenderer'
import { PaginatorRenderer } from './renderers/PaginatorRenderer'
import type { Organization } from './types/Organization'
import { isKeyOf, typedEntries } from './helpers/helpers'
import { isFormFull, resetForm, setDisableValueButtonOnForm, toggleFormModal } from './helpers/domHelpers'
import { getNextPage } from './callbacks/paginator'
import { addButtonCallback } from './callbacks/add-button'

const tableHeaders: OrganizationHeader[] = [
  {
    title: 'Название',
    label: 'name'
  },
  {
    title: 'ФИО директора',
    label: 'headManagerName'
  },
  {
    title: 'Номер телефона',
    label: 'phone'
  },
  {
    title: 'Адрес',
    label: 'address'
  },
  {
    title: '',
    classList: 'organization-table__cell--action'
  }
]

const currentFilters: EntityRepositoryFilters = {
  searchString: '',
}

const currentSorts: EntityRepositorySorts<Organization> = {}

const orgRepository = OrganizationsRepositoryFactory.createLocal({ perPage: 15})

let { items, pagination } = orgRepository.getOrganizations()

//table init

const renderTable = OrganizationsTableRenderer.getRenderFunction(
  document.getElementById('organization-table') as HTMLDivElement
)

renderTable(tableHeaders, items, currentSorts)

const tableHeader = document.getElementById('organization-table')

tableHeader?.addEventListener('click', tableCallback)

// paginator init

const paginatorContainer = document.getElementById('paginator')

const renderPaginator = PaginatorRenderer.getRenderFunction(paginatorContainer as HTMLDivElement)

renderPaginator(pagination)

paginatorContainer?.addEventListener('click', event => {
  const page = getNextPage(event, pagination)

  rerenderPage(page)
})

// search init

const searchInput = document.getElementById('search-input')

searchInput?.addEventListener('input', event => {
  if (event.target instanceof HTMLInputElement) {
    currentFilters.searchString = event.target.value
    rerenderPage(1)
  }
})

// form

const form = document.getElementById('organizations-form')

if (form instanceof HTMLFormElement) {
  form.addEventListener('submit', organizationFormCallback)

  // live validation
  form.addEventListener('input', () => {
    const isFullForm = isFormFull(form)
    setDisableValueButtonOnForm('organizations-form', !isFullForm)
  })
}

// buttons

const addButton = document.getElementById('organizations-add-button')

addButton?.addEventListener('click', addButtonCallback)

const closeButton = document.getElementById('organizations-form-modal-close-button')

closeButton?.addEventListener('click', () => toggleFormModal(false))

const cancelButton = document.getElementById('button-cancel')

cancelButton?.addEventListener('click', () => toggleFormModal(false))

//callbacks

function organizationFormCallback (event: Event) {
  event.preventDefault()

  const form = event.target

  if (form instanceof HTMLFormElement) {
    const formData = new FormData(form);

    const mappedFromData: { [key: string]: FormDataEntryValue } = {}

    for (let [key, value] of formData.entries()) {
        mappedFromData[key] = value
    }

    const data: Omit<Organization, 'id'> = {
      name: mappedFromData.name as string,
      headManagerName: mappedFromData.headManagerName as string,
      phone: mappedFromData.phone as string,
      address: {
        city: mappedFromData.city as string,
        street: mappedFromData.street as string,
        house: mappedFromData.house as string
      }
    }

    if (mappedFromData.id) {
      const id = +mappedFromData.id

      if (!Number.isNaN(id)) {
        orgRepository.updateOrganization({ id, ...data })
      }
    } else {
      orgRepository.addOrganization(data) 
    }

    resetForm('organizations-form')
    toggleFormModal(false)
    rerenderPage(1)
  }
}

const defineSorts = (label: string) => {
  const getNextSort = (currentSort: SortDirections): SortDirections => {
    if (!currentSort) return 'ASC'
    if (currentSort === 'ASC') return 'DESC'
    if (currentSort === 'DESC') return
  }

  const fieldsForSort = [ 'name', 'headManagerName' ]

  if (!label || !fieldsForSort.includes(label)) return

  if (isKeyOf(currentSorts, label)) {
    const nextSort = getNextSort(currentSorts[label])
    if (nextSort) {
      currentSorts[label] = nextSort
    } else {
      delete currentSorts[label]
    }
    
  } else {
    currentSorts[label as keyof Organization] = 'ASC'
  }

  rerenderPage(1)

}

const deleteOrg = (orgId: string) => {
  const numOrgId = +orgId
  if (!Number.isNaN(numOrgId)) {
    orgRepository.removeOrganization(numOrgId)

    rerenderPage(pagination.page)
  } else {
    throw 'Передан некорректный id'
  }
}

const openUpdateForm = (orgId: string) => {
  const numOrgId = +orgId
  if (!Number.isNaN(numOrgId)) {
    const orgForUpdate = orgRepository.getOrganizationById(numOrgId)

    if (orgForUpdate) {

      const title = document.querySelector('#organizations-form-modal-title')

      if (title instanceof HTMLElement) {
        title.innerText = 'Редактирование организации'
      }

      toggleFormModal(true)

      const form = document.getElementById('organizations-form')!

      const fillFormWithData = (data: object) => {
        typedEntries(data).forEach(([field, value]) => {
          if (typeof value === 'object') {
            console.log('is object', field)
            fillFormWithData(value)
          } else {
            const input = form.querySelector(`input[name=${field}]`)
            if (input instanceof HTMLInputElement) {
              input.value = value
            }
          }
        })
      }

      fillFormWithData(orgForUpdate)
      setDisableValueButtonOnForm('organizations-form', false)
    }
  }
}

function tableCallback (event: PointerEvent) {
  const { target } = event

  if (target instanceof HTMLDivElement) {

    const sortLabel = target.dataset.sortLabel
    sortLabel && defineSorts(sortLabel)

    const isCell = /__cell/.test(target.className)
    const row = target.closest('div[data-entity-id]')

    if (row instanceof HTMLDivElement) {
      const entityId = row.dataset.entityId

      if (isCell) {
        entityId && openUpdateForm(entityId)
      } else {
        entityId && deleteOrg(entityId)
      }
    }
  }
}

const refreshData = (page: number) => {
  const orgs = orgRepository.getOrganizations({
    ...currentFilters,
    pagination: {
      page
    }
  },
  currentSorts)

  items = orgs.items
  pagination = orgs.pagination
}

const rerenderPage = (page: number) => {
  refreshData(page)
  renderTable(tableHeaders, items, currentSorts)
  renderPaginator(pagination)
}
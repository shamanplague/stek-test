import './style.css'
import { defaultOrganizationsState } from './mockData/defaultOrganizationsState'
import { OrganizationsRepositoryFactory } from './repositories/organizations/OrganizationsRepository'
import type { EntityRepositoryFilters, EntityRepositorySorts, SortDirections } from './types/Repository'
import type { OrganizationHeader } from './renderers/types'
import { OrganizationsTableRenderer } from './renderers/OrganizationsTableRenderer'
import { PaginatorRenderer } from './renderers/PaginatorRenderer'
import type { Organization } from './types/Organization'
import { isKeyOf, typedEntries } from './helpers/helpers'
import { resetForm, setDisableValueButtonOnForm, toggleFormModal } from './helpers/domHelpers'

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

defaultOrganizationsState.forEach(item => orgRepository.addOrganization(item))

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

paginatorContainer?.addEventListener('click', paginatorCallback)

// search init

const searchInput = document.getElementById('search-input')

searchInput?.addEventListener('input', searchCallback)

// form

const form = document.getElementById('organizations-form')

if (form instanceof HTMLFormElement) {
  form.addEventListener('submit', organizationFormCallback)
  // live validation
  form.addEventListener('input', () => liveValidationCallback(form))
}

// buttons

const addButton = document.getElementById('organizations-add-button')

addButton?.addEventListener('click', addButtonCallback)

const closeButton = document.getElementById('organizations-form-modal-close-button')

closeButton?.addEventListener('click', () => toggleFormModal(false))

const cancelButton = document.getElementById('button-cancel')

cancelButton?.addEventListener('click', () => toggleFormModal(false))

// handlers

function addButtonCallback () {
  const title = document.querySelector('#organizations-form-modal-title')

  if (title instanceof HTMLElement) {
    title.innerText = 'Создание организации'
  }

  toggleFormModal(true)
}

function liveValidationCallback (form: HTMLFormElement) {

  if (form instanceof HTMLFormElement) {

    const inputs = form.querySelectorAll("input:not(input[type='hidden'])")

    const allInputs = Array.from(inputs) as HTMLInputElement[]

    const allInputsValues = allInputs.map(item => item.value)

    const isFullForm = allInputsValues.every(item => item)

    setDisableValueButtonOnForm('organizations-form', !isFullForm)
  }
}

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
    refreshData(1)
    renderTable(tableHeaders, items, currentSorts)
    renderPaginator(pagination)
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

  refreshData(1)
  renderTable(tableHeaders, items, currentSorts)
  renderPaginator(pagination)

}

const deleteOrg = (orgId: string) => {
  const numOrgId = +orgId
  if (!Number.isNaN(numOrgId)) {
    orgRepository.removeOrganization(numOrgId)

    refreshData(pagination.page)
    renderTable(tableHeaders, items, currentSorts)
    renderPaginator(pagination)
  } else {
    throw 'Передан некорректный id'
  }
}

const updateOrg = (orgId: string) => {
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
        entityId && updateOrg(entityId)
      } else {
        entityId && deleteOrg(entityId)
      }
    }
  }
}

function paginatorCallback (event: Event) {

  const { target } = event

  if (target instanceof HTMLElement) {
    if (target.id === 'paginator-button-prev') { goBack() }
    if (target.id === 'paginator-button-next') { goForward() }
    if (/paginator__number/.test(target.className)) { goToPage(+target.innerText) }
  }

  renderPaginator(pagination)
}

const goBack = () => {
  const newPage = pagination.page - 1

  if(newPage > 0) {
    refreshData(newPage)
    renderTable(tableHeaders, items, currentSorts)
  }
}

const goForward = () => {
  const newPage = pagination.page + 1

  if (newPage <= pagination.totalPages) {
    refreshData(newPage)
    renderTable(tableHeaders, items, currentSorts)
  } 
}

const goToPage = (page: number) => {
  refreshData(page)
  renderTable(tableHeaders, items, currentSorts)
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

function searchCallback (event: Event) {
  if (event.target instanceof HTMLInputElement) {
    currentFilters.searchString = event.target.value
    
    refreshData(1)
    renderTable(tableHeaders, items, currentSorts)
    renderPaginator(pagination)
  }
}
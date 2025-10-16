import './style.css'
import { defaultOrganizationsState } from './mockData/defaultOrganizationsState'
import { OrganizationsRepositoryFactory } from './repositories/organizations/OrganizationsRepository'
import type { EntityRepositoryGetFilters } from './types/Repository'
import type { OrganizationHeader } from './renderers/types'
import { OrganizationsTableRenderer } from './renderers/OrganizationsTableRenderer'
import { PaginatorRenderer } from './renderers/PaginatorRenderer'

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

const currentFilters: EntityRepositoryGetFilters = {
  searchString: '',
  currentSortings: [
    { name: 'ASC' }
  ]
}

const orgRepository = OrganizationsRepositoryFactory.createLocal({ perPage: 15})

defaultOrganizationsState.forEach(item => orgRepository.addOrganization(item))

let { items, pagination } = orgRepository.getOrganizations()

//table init

const renderTable = OrganizationsTableRenderer.getRenderFunction(
  document.getElementById('organization-table') as HTMLDivElement
)

renderTable(tableHeaders, items)

// paginator init

const paginatorContainer = document.getElementById('paginator')

const renderPaginator = PaginatorRenderer.getRenderFunction(paginatorContainer as HTMLDivElement)

renderPaginator(pagination)

paginatorContainer?.addEventListener('click', paginatorCallback)

// search init

const searchInput = document.getElementById('search-input')

searchInput?.addEventListener('input', searchCallback)

// handlers

function paginatorCallback (event: Event) {

  const { target } = event

  if (target instanceof HTMLElement) {
    if (target.id === 'paginator-button-prev') { goBack() }
    if (target.id === 'paginator-button-next') { goForward() }
    if (/paginator__number/.test(target.className)) { goToPage(+target.innerText) }
  }
}

function searchCallback (event: Event) {
  if (event.target instanceof HTMLInputElement) {
    currentFilters.searchString = event.target.value
    
    refreshData(1)
    renderTable(tableHeaders, items)
    renderPaginator(pagination)
  }
}

const goBack = () => {
  const newPage = pagination.page - 1

  if(newPage > 0) {
    refreshData(newPage)
    renderTable(tableHeaders, items)
  }
}

const goForward = () => {
  const newPage = pagination.page + 1

  if (newPage <= pagination.totalPages) {
    refreshData(newPage)
    renderTable(tableHeaders, items)
  } 
}

const goToPage = (page: number) => {
  refreshData(page)
  renderTable(tableHeaders, items)
}

const refreshData = (page: number) => {
  const orgs = orgRepository.getOrganizations({
    ...currentFilters,
    pagination: {
      page
    }
  })

  items = orgs.items
  pagination = orgs.pagination
}
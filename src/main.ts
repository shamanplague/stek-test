import './style.css'
import { defaultOrganizationsState } from './mockData/defaultOrganizationsState'
import { OrganizationsRepositoryFactory } from './repositories/organizations/OrganizationsRepository'
import type { EntityRepositoryFilters, EntityRepositorySorts, SortDirections } from './types/Repository'
import type { OrganizationHeader } from './renderers/types'
import { OrganizationsTableRenderer } from './renderers/OrganizationsTableRenderer'
import { PaginatorRenderer } from './renderers/PaginatorRenderer'
import type { Organization } from './types/Organization'
import { isKeyOf } from './helpers/helpers'

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

tableHeader!.addEventListener('click', headerCallback)

// paginator init

const paginatorContainer = document.getElementById('paginator')

const renderPaginator = PaginatorRenderer.getRenderFunction(paginatorContainer as HTMLDivElement)

renderPaginator(pagination)

paginatorContainer?.addEventListener('click', paginatorCallback)

// search init

const searchInput = document.getElementById('search-input')

searchInput?.addEventListener('input', searchCallback)

// handlers

function headerCallback (event: PointerEvent) {
  const { target } = event

  const getNextSort = (currentSort: SortDirections): SortDirections => {
    if (!currentSort) return 'ASC'
    if (currentSort === 'ASC') return 'DESC'
    if (currentSort === 'DESC') return
  }

  if (target instanceof HTMLElement) {
    const label = target.getAttribute('data-sort-label')

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

function searchCallback (event: Event) {
  if (event.target instanceof HTMLInputElement) {
    currentFilters.searchString = event.target.value
    
    refreshData(1)
    renderTable(tableHeaders, items, currentSorts)
    renderPaginator(pagination)
  }
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
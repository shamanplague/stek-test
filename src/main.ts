import { defaultOrganizationsState } from './mockData/defaultOrganizationsState'
import { OrganizationsRepositoryFactory } from './repositories/organizations/OrganizationsRepository'
import './style.css'
import { renderPaginator } from './renderPaginator'
import { renderTable } from './renderTable'
import type { EntityRepositoryGetFilters } from './types/Repository'

const orgRepository = OrganizationsRepositoryFactory.createLocal({ perPage: 15})

defaultOrganizationsState.forEach(item => orgRepository.addOrganization(item))

let { items, pagination } = orgRepository.getOrganizations()

const currentFilters: EntityRepositoryGetFilters = {
  searchString: '',
}

renderTable(items)

const paginatorNumbersContainer = document.getElementById('paginator-numbers')

if (paginatorNumbersContainer instanceof HTMLElement) {
  renderPaginator(paginatorNumbersContainer, {
    pageNumber: pagination.totalPages,
    callback: paginatorCallback
  })
}

const searchInput = document.getElementById('search-input')
searchInput?.addEventListener('input', (event: Event) => {
  if (event.target instanceof HTMLInputElement) {
    currentFilters.searchString = event.target.value
    refreshTable(1)

    if (pagination.totalItems === 0) {
      const paginator = document.getElementById('paginator')
      if (paginator instanceof HTMLElement) {
        paginator.innerHTML = ''
      }
    } 

    if (paginatorNumbersContainer instanceof HTMLElement) {
      renderPaginator(paginatorNumbersContainer, {
        pageNumber: pagination.totalPages,
        callback: paginatorCallback
      })
    }
  }
})

// handlers

function paginatorCallback (event: Event) {

  const { target } = event

  if (target instanceof HTMLElement) {
    if (target.id === 'paginator-button-prev') { goBack() }
    if (target.id === 'paginator-button-next') { goForward() }
    if (/paginator__number/.test(target.className)) { goToPage(+target.innerText) }
  }
}

const goBack = () => {
  const newPage = pagination.page - 1

  newPage > 0 && refreshTable(newPage)
}

const goForward = () => {
  const newPage = pagination.page + 1

  newPage <= pagination.totalPages && refreshTable(newPage)  
}

const goToPage = (page: number) => {
  refreshTable(page)  
}

const refreshTable = (page: number) => {
  const orgs = orgRepository.getOrganizations({
    ...currentFilters,
    pagination: {
      page
    }
  })

  items = orgs.items
  pagination = orgs.pagination

  renderTable(items)
}
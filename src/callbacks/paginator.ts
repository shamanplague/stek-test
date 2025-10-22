import type { Pagination } from "../types/Repository"

export const getNextPage = (event: Event, pagination: Pagination) => {

  const { target } = event

  let resPage = pagination.page

  if (target instanceof HTMLElement) {

    if (target.id === 'paginator-button-prev') {
        
        const newPage = pagination.page - 1

        if (newPage > 0) { resPage = newPage }
    }

    if (target.id === 'paginator-button-next') { 

        const newPage = pagination.page + 1

        if (newPage <= pagination.totalPages) { resPage = newPage }
    }

    if (/paginator__number/.test(target.className)) {
        resPage = +target.innerText
    }

    return resPage
  } else {
    return resPage
  }
}
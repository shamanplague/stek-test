import type { Pagination } from "../types/Repository"

export class PaginatorRenderer {

    static getRenderFunction = (rootElement: HTMLDivElement): (data: Pagination) => void => {
        return (data: Pagination) => {
            PaginatorRenderer.renderData(rootElement, data)
        }
    }

    private static renderData(rootElement: HTMLDivElement, data: Pagination): void {

        rootElement.innerHTML = ''

        const fragment = document.createDocumentFragment()

        if (data.totalPages < 1) return

        const prevButton = document.createElement('button')
        prevButton.className = 'paginator__button paginator__button--prev'
        prevButton.id = 'paginator-button-prev'
        prevButton.innerText = 'Назад'

        const nextButton = document.createElement('button')
        nextButton.className = 'paginator__button paginator__button--next'
        nextButton.id = 'paginator-button-next'
        nextButton.innerText = 'Вперёд'

        const numbers = document.createDocumentFragment()

        for (let i = 1; i <= data.totalPages ; i++) {
            const page = document.createElement('div')
            page.className = 'paginator__number'
            page.innerText = `${i}`

            numbers.appendChild(page)
        }

        fragment.appendChild(prevButton)
        fragment.appendChild(numbers)
        fragment.appendChild(nextButton)

        rootElement.appendChild(fragment)
    }
}
import type { PaginatorData } from "./types"

export class PaginatorNumbersRenderer {
    static renderData(rootElement: HTMLDivElement, data: PaginatorData): void {

        rootElement.innerHTML = ''

        const fragment = document.createDocumentFragment()

        for (let i = 1; i <= data.pageNumber ; i++) {
            const page = document.createElement('div')
            page.className = 'paginator__number'
            page.innerText = `${i}`

            fragment.appendChild(page)
        }

        rootElement.appendChild(fragment)
    }
}
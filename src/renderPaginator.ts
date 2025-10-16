import { PaginatorNumbersRenderer } from "./renderers/PaginatorRenderer"
import type { PaginatorData } from "./renderers/types"

export const renderPaginator = (rootElement: HTMLElement, data: PaginatorData) => {

    rootElement.innerHTML = ''

    if (rootElement instanceof HTMLDivElement) {
        PaginatorNumbersRenderer.renderData(rootElement, data)
    }

    const paginatorContainer = document.getElementById('paginator')

    paginatorContainer?.addEventListener('click', data.callback)
}
import { typedEntries } from "../helpers/helpers";
import type { Organization } from "../types/Organization";
import type { EntityRepositorySorts, SortDirections } from "../types/Repository";
import type { OrganizationHeader } from "./types";

export class OrganizationsTableRenderer {

  static getRenderFunction = (
    rootElement: HTMLDivElement
  ): (
    headers: OrganizationHeader[],
    items: Organization[],
    sorts?: EntityRepositorySorts<Organization>
  ) => void => {
    return (
      headers: OrganizationHeader[],
      items: Organization[],
      sorts?: EntityRepositorySorts<Organization>
    ) => 
    {
      OrganizationsTableRenderer.renderTable(rootElement, headers, items, sorts)
    }
  }

  private static renderTable = (
    rootElement: HTMLDivElement,
    headers: OrganizationHeader[],
    items: Organization[],
    sorts?: EntityRepositorySorts<Organization>
  ) => {

    rootElement.innerHTML = ''

    if (!headers.length) return

    const fragment = document.createDocumentFragment()

    const tableHeaderContainer = document.createElement('div')
    tableHeaderContainer.className = 'organization-table__header'
    tableHeaderContainer.id = 'organization-table-header'

    const header = OrganizationsTableRenderer.buildHeader(headers)

    if (sorts) {

      typedEntries(sorts).forEach(sort => {
        const [ field, direction ] = sort

        const elementForSort = header.querySelector(`[data-sort-label="${field}"]`)

        if (elementForSort instanceof HTMLElement) {
          this.setSortIconOnMarkdown(elementForSort, direction)
        }
      })
    }

    tableHeaderContainer.appendChild(header)
    
    const tableContentContainer = document.createElement('div')
    tableContentContainer.className = 'organization-table__content'

    const rows = OrganizationsTableRenderer.buildRows(items)

    tableContentContainer.appendChild(rows)

    fragment.appendChild(tableHeaderContainer)
    fragment.appendChild(tableContentContainer)

    rootElement.appendChild(fragment)
  }

  private static setSortIconOnMarkdown = (target: HTMLElement, sort: SortDirections) => {
    if (sort === 'ASC') {
      target.className += ' sort-arrow-down'
    } else if (sort === 'DESC') {
      target.className += ' sort-arrow-up'
    }

    target.className = target.className.trim()
  }

  private static buildHeader(data: OrganizationHeader[]): DocumentFragment {

    const fragment = document.createDocumentFragment()

    data.forEach(header => {
      const { title, label, classList } = header

      const headerCell = document.createElement('div')
      headerCell.className = 'organization-table__cell'

      if (classList) [
        headerCell.className += ` ${classList}`
      ]
      
      headerCell.innerText = title

      if (label) {
        headerCell.setAttribute('data-sort-label', label)
      }

      fragment.appendChild(headerCell)

    })

    return fragment
  }

  private static buildRows(data: Organization[]): DocumentFragment {

    const fragment = document.createDocumentFragment()

    if (!data.length) {
      const noDataLabel = document.createElement('div')
      noDataLabel.className = 'organization-table__no-data'
      noDataLabel.innerText = 'Нет данных'

      fragment.appendChild(noDataLabel)

      return fragment
    }

    data.forEach((org, index) => {
      const row = document.createElement('div')
      row.className = 'organization-table__row'

      if (index % 2) {
        row.className += ' organization-table__row--gray'
      }

      const cols = [
        org.name,
        org.headManagerName,
        org.phone,
        `г. ${org.address.city}, ул. ${org.address.street}, д. ${org.address.house}`,
        'X'
      ]

      cols.forEach((text, index) => {
        const col = document.createElement('div')
        col.className = 'organization-table__cell'
        if (index === cols.length-1) {
            col.className += ' organization-table__cell--action'
            const actionElement = document.createElement('div')
            actionElement.id = 'delete-action-button'
            actionElement.className += 'delete-action-button'
            actionElement.textContent = text
            col.appendChild(actionElement)
        } else {
          col.textContent = text
        }
        
        row.appendChild(col)
        row.setAttribute('data-entity-id', `${org.id}`)
      })

      fragment.appendChild(row)
    })

    return fragment
  }
}
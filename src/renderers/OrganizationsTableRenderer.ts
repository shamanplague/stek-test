import type { Organization } from "../types/Organization";
import type { OrganizationHeader } from "./types";

export class OrganizationsTableRenderer {

  static getRenderFunction = (rootElement: HTMLDivElement): (headers: OrganizationHeader[], items: Organization[]) => void => {
    return (headers: OrganizationHeader[], items: Organization[]) => {
      OrganizationsTableRenderer.renderTable(rootElement, headers, items)
    }
  }

  private static renderTable = (rootElement: HTMLDivElement, headers: OrganizationHeader[], items: Organization[]) => {

    rootElement.innerHTML = ''

    if (!headers.length) return

    const fragment = document.createDocumentFragment()

    const tableHeaderContainer = document.createElement('div')
    tableHeaderContainer.className = 'organization-table__header'

    const header = OrganizationsTableRenderer.buildHeader(headers)

    tableHeaderContainer.appendChild(header)
    
    const tableContentContainer = document.createElement('div')
    tableContentContainer.className = 'organization-table__content'

    const rows = OrganizationsTableRenderer.buildRows(items)

    tableContentContainer.appendChild(rows)

    fragment.appendChild(tableHeaderContainer)
    fragment.appendChild(tableContentContainer)

    rootElement.appendChild(fragment)
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
        `${org.address.city}, ${org.address.street}, д. ${org.address.house}`,
        'X'
      ]

      cols.forEach((text, index) => {
        const col = document.createElement('div')
        col.className = 'organization-table__cell'
        if (index === cols.length-1) {
            col.className += ' organization-table__cell--action'
        }
        col.textContent = text
        row.appendChild(col)
      })

      fragment.appendChild(row)
    })

    return fragment
  }
}
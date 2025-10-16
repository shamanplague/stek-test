import type { Organization } from "../types/Organization";

export class OrganizationsTableRowRenderer {
    static renderData(rootElement: HTMLDivElement, data: Organization[]): void {

    rootElement.innerHTML = ''

    if (!data.length) {
      const noDataLabel = document.createElement('div')
      noDataLabel.className = 'organization-table__no-data'
      noDataLabel.innerText = 'Нет данных'
      rootElement.appendChild(noDataLabel)

      return
    }

    const fragment = document.createDocumentFragment()

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

    rootElement.appendChild(fragment)

    }
}
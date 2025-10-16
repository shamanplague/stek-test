import { OrganizationsTableRowRenderer } from "./renderers/OrganizationsTableRowRenderer"
import type { Organization } from "./types/Organization"

export const renderTable = (items: Organization[]) => {
    const tableMountContainer = document.getElementById('organization-table-content')

    if (tableMountContainer instanceof HTMLDivElement) {
    OrganizationsTableRowRenderer.renderData(
        tableMountContainer,
        items
    )
    }
}
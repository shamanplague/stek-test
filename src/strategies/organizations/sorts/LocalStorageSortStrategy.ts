import { typedEntries } from "../../../helpers/helpers";
import type { Organization } from "../../../types/Organization";
import type { EntityRepositorySorts } from "../../../types/Repository";
import type { SortStrategy } from "./SortStrategy";
import type { LocalStorageRepositorySorts } from "./types";


export class LocalStorageSortStrategy implements SortStrategy<Organization, LocalStorageRepositorySorts<Organization>> {
  applySorts(sorts: EntityRepositorySorts<Organization>): LocalStorageRepositorySorts<Organization> {

    return {

      sortFn: (items: Organization[]): Organization[] => {
        return [...items].sort((a, b) => {
          for (const [field, direction] of typedEntries(sorts)) {
            
            const valueA = a[field]
            const valueB = b[field]

            if (typeof valueA === 'string' && typeof valueB === 'string') {
              const comparison = valueA.localeCompare(valueB)
              if (comparison !== 0) {
                return direction === 'DESC' ? -comparison : comparison
              }
            }

            if (typeof valueA === 'number' && typeof valueB === 'number') {
              const comparison = valueA - valueB
              if (comparison !== 0) {
                return direction === 'DESC' ? -comparison : comparison
              }
            }
          }

          return 0
        })
      }
    }
  }
}
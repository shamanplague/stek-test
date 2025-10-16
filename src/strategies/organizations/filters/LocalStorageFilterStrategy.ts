import type { Organization } from "../../../types/Organization";
import type { FilterStrategy } from "./FilterStrategy";
import type { RepositoryGetFilters } from "../../../types/Repository"
import type { LocalStorageRepositoryGetFilters } from "./types";


export class LocalStorageFilterStrategy implements FilterStrategy<LocalStorageRepositoryGetFilters<Organization>> {
  applyFilters(filters: RepositoryGetFilters): LocalStorageRepositoryGetFilters<Organization> {
    return {
      predicate: filters.searchString
        ? (org: Organization) => org.headManagerName.toLowerCase().includes(filters.searchString!.toLowerCase())
        : undefined,
      pagination: filters.pagination
    }
  }
}
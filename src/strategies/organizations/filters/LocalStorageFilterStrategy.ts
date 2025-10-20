import type { Organization } from "../../../types/Organization";
import type { FilterStrategy } from "./FilterStrategy";
import type { RepositoryFilters } from "../../../types/Repository"
import type { LocalStorageRepositoryFilters } from "./types";


export class LocalStorageFilterStrategy implements FilterStrategy<LocalStorageRepositoryFilters<Organization>> {
  applyFilters(filters: RepositoryFilters): LocalStorageRepositoryFilters<Organization> {
    return {
      predicate: filters.searchString
        ? (org: Organization) => org.headManagerName.toLowerCase().includes(filters.searchString!.toLowerCase())
        : undefined,
      pagination: filters.pagination
    }
  }
}
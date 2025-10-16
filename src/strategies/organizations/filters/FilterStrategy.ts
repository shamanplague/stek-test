import type { RepositoryGetFilters } from "../../../types/Repository"

export interface FilterStrategy<T> {
  applyFilters(filters: RepositoryGetFilters): T
}
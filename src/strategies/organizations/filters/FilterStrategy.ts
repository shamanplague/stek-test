import type { EntityRepositoryFilters } from "../../../types/Repository"

export interface FilterStrategy<T> {
  applyFilters(filters: EntityRepositoryFilters): T
}
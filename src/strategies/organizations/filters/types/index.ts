import type { PaginationFilter } from "../../../../types/Repository"

export type LocalStorageRepositoryGetFilters<T> = {
    predicate?: (entity: T) => boolean
    pagination: PaginationFilter
}
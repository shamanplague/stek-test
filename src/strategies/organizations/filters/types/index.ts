import type { PaginationFilter } from "../../../../types/Repository"

export type LocalStorageRepositoryFilters<T> = {
    predicate?: (entity: T) => boolean
    pagination: PaginationFilter
}
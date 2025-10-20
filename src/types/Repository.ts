import type { DeepPartial } from "./CustomUtilities"

export type DefaultEntity = {
    id: number,
}

export type WithoutId<T> = Omit<T, 'id'>

export type OnlyIdRequired<T extends DefaultEntity> = { id: T['id'] } & DeepPartial<Omit<T, 'id'>>

export type PaginationFilter = { page: number; perPage: number }

export type EntityRepositoryFilters = {
    pagination?: Pick<PaginationFilter, 'page'>
    searchString?: string
}

export type RepositoryFilters = {
    pagination: PaginationFilter
    searchString?: string
}

export type Pagination = Record<'page' | 'perPage' | 'totalPages' | 'totalItems', number>

export type RepositoryResponseWithPagination<Entity> = {
    items: Entity[]
    pagination: Pagination
}

export type SortDirections = 'ASC' | 'DESC' | undefined

export type EntityRepositorySorts<T> = { [key in keyof T]?: SortDirections }

export interface Repository<RepositoryEntity extends DefaultEntity, FiltersFormat, SortsFormat> {
    getItems(filters? : FiltersFormat, sorts?: SortsFormat): RepositoryResponseWithPagination<RepositoryEntity>
    getItemById(id: number): RepositoryEntity
    addItem(data: WithoutId<RepositoryEntity>): void
    updateItem(data: OnlyIdRequired<RepositoryEntity>): void
    removeItem(id: number): void
}
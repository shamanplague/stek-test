import type { DeepPartial } from "./CustomUtilities"

export type DefaultEntity = {
    id: number,
}

export type WithoutId<T> = Omit<T, 'id'>

export type OnlyIdRequired<T extends DefaultEntity> = { id: T['id'] } & DeepPartial<Omit<T, 'id'>>

export type PaginationFilter = { page: number; perPage: number }

export type EntitySort = { [key: string]: 'ASC' | 'DESC' }

export type EntityRepositoryGetFilters = {
    pagination?: Pick<PaginationFilter, 'page'>
    searchString?: string
    currentSortings?: EntitySort[]
}

export type RepositoryGetFilters = {
    pagination: PaginationFilter
    searchString?: string
}

export type Pagination = Record<'page' | 'perPage' | 'totalPages' | 'totalItems', number>

export type RepositoryResponseWithPagination<Entity> = {
    items: Entity[]
    pagination: Pagination
}

export interface Repository<RepositoryEntity extends DefaultEntity, FiltersFormat> {
    getItems(filters? : FiltersFormat): RepositoryResponseWithPagination<RepositoryEntity>
    getItemById(id: number): RepositoryEntity
    addItem(data: WithoutId<RepositoryEntity>): void
    updateItem(data: OnlyIdRequired<RepositoryEntity>): void
    removeItem(id: number): void
}
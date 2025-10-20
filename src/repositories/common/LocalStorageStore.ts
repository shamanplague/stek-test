import type { DefaultEntity, Repository, OnlyIdRequired, WithoutId, RepositoryResponseWithPagination } from "../../types/Repository"
import { deepMerge } from "../../helpers/helpers"
import type { LocalStorageRepositoryFilters } from "../../strategies/organizations/filters/types"
import type { LocalStorageRepositorySorts } from "../../strategies/organizations/sorts/types"

export class LocalStorageStore<Entity extends DefaultEntity> implements Repository<Entity, LocalStorageRepositoryFilters<Entity>, LocalStorageRepositorySorts<Entity>> {

    private state: Entity[] = []

    private getNewId (): Entity['id'] {
        return this.state.length
    }

    getItems (filters: LocalStorageRepositoryFilters<Entity>, sorts: LocalStorageRepositorySorts<Entity>): RepositoryResponseWithPagination<Entity> {
        let rawItems = this.state
        let items = this.state

        if (filters.predicate) {
            rawItems = rawItems.filter(filters.predicate)
            items = items.filter(filters.predicate)
        }

        if (sorts) {
            items = sorts.sortFn(items)
        }

        const { page, perPage } = filters.pagination
        const start = (page - 1) * perPage
        const end = start + perPage
        items = items.slice(start, end)
        
        return {
            items,
            pagination: {
                page,
                perPage,
                totalPages: Math.ceil(rawItems.length / perPage),
                totalItems: rawItems.length
            }
        }
    }

    getItemById (id: Entity['id']): Entity {
        const res = this.state.find(item => item.id === id)

        if (res) {
            return res
        } else {
            throw new Error('Нет сущности с таким id')
        }
    }

    addItem(data: WithoutId<Entity>): void {
        this.state.push({
            ...data,
            id: this.getNewId()
        } as Entity)
    }

    updateItem(data: OnlyIdRequired<Entity>): void {
        const index = this.state.findIndex(item => item.id === data.id)

        if (index === -1) {
            throw new Error('Нет сущности с таким id')
        }

        const existingItem = this.state[index]

        this.state[index] = deepMerge(existingItem, data as Partial<Entity>)
    }

    removeItem (id: Entity['id']) {
        this.state = this.state.filter(item => item.id !== id)
    }
}
import type { DefaultEntity, Repository, OnlyIdRequired, WithoutId, RepositoryResponseWithPagination } from "../../types/Repository"
import { deepMerge } from "../../helpers/helpers"
import type { LocalStorageRepositoryFilters } from "../../strategies/organizations/filters/types"
import type { LocalStorageRepositorySorts } from "../../strategies/organizations/sorts/types"
import { defaultOrganizationsState } from "../../mockData/defaultOrganizationsState"

export class LocalStorageStore<Entity extends DefaultEntity> implements Repository<Entity, LocalStorageRepositoryFilters<Entity>, LocalStorageRepositorySorts<Entity>> {

    private LSLabel = 'org-directory-state'

    private state: Entity[] = []

    private getNewId (): Entity['id'] {
        return this.state.length
    }

    constructor () {
        this.loadState()
    }

    private saveState = () => {
        let serializedState = ''

        try {
            serializedState = JSON.stringify(this.state)
        } catch {
            throw 'Не удалось сериализовать состояние'
        }

        localStorage.setItem(this.LSLabel, serializedState)
    }

    private loadState = () => {
        let unserializedState = {}

        try {
            unserializedState = JSON.parse(localStorage.getItem(this.LSLabel)!) as object
        } catch {
            throw 'Не удалось сериализовать состояние'
        }

        this.state = unserializedState as Entity[] || defaultOrganizationsState
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
        this.state.unshift({
            ...data,
            id: this.getNewId()
        } as Entity)

        this.saveState()
    }

    updateItem(data: OnlyIdRequired<Entity>): void {
        const index = this.state.findIndex(item => item.id === data.id)

        if (index === -1) {
            throw new Error('Нет сущности с таким id')
        }

        const existingItem = this.state[index]

        this.state[index] = deepMerge(existingItem, data as Partial<Entity>)

        this.saveState()
    }

    removeItem (id: Entity['id']) {
        this.state = this.state.filter(item => item.id !== id)

        this.saveState()
    }
}
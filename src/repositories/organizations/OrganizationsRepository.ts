import type { Organization } from "../../types/Organization"
import type { WithoutId, OnlyIdRequired, Repository, RepositoryResponseWithPagination, PaginationFilter, EntityRepositoryFilters, EntityRepositorySorts } from "../../types/Repository"
import type { FilterStrategy } from "../../strategies/organizations/filters/FilterStrategy"
import type { LocalStorageRepositoryFilters } from "../../strategies/organizations/filters/types"
import { LocalStorageFilterStrategy } from "../../strategies/organizations/filters/LocalStorageFilterStrategy"
import { LocalStorageStore } from "../common/LocalStorageStore"
import { deepMerge } from "../../helpers/helpers"
import { LocalStorageSortStrategy } from "../../strategies/organizations/sorts/LocalStorageSortStrategy"
import type { SortStrategy } from "../../strategies/organizations/sorts/SortStrategy"
import type { LocalStorageRepositorySorts } from "../../strategies/organizations/sorts/types"

export class OrganizationsRepositoryFactory {
  static createLocal(options?: | { perPage?: number } | undefined): OrganizationsRepository {
    return new OrganizationsRepository(
      new LocalStorageStore<Organization>(),
      new LocalStorageFilterStrategy(),
      new LocalStorageSortStrategy(),
      { page: 1, perPage: options?.perPage || 10}
    )
  }
}

class OrganizationsRepository {

  private repository: Repository<Organization, LocalStorageRepositoryFilters<Organization>, LocalStorageRepositorySorts<Organization>>
  private filterStrategy: FilterStrategy<LocalStorageRepositoryFilters<Organization>>
  private sortStrategy: SortStrategy<Organization, LocalStorageRepositorySorts<Organization>>
  private defaultPagination: PaginationFilter

  constructor (
    repository: Repository<Organization, LocalStorageRepositoryFilters<Organization>, LocalStorageRepositorySorts<Organization>>, 
    filterStrategy: FilterStrategy<LocalStorageRepositoryFilters<Organization>>,
    sortStrategy: SortStrategy<Organization, LocalStorageRepositorySorts<Organization>>,
    defaultPagination: PaginationFilter
  ) {
    this.repository = repository
    this.filterStrategy = filterStrategy
    this.sortStrategy = sortStrategy
    this.defaultPagination = defaultPagination
  }

  getOrganizations (filters: EntityRepositoryFilters = {}, sorts: EntityRepositorySorts<Organization> = {}): RepositoryResponseWithPagination<Organization> {

    let pagination = this.defaultPagination

    if (filters.pagination) {
      if (filters.pagination.page < 1) {
        throw new Error('Страница должна быть положительным числом')
      }
      pagination = deepMerge(this.defaultPagination, filters.pagination)
    }

    const mergedFilters = {
      ...filters,
      pagination,
    }

    const adaptedFilters = this.filterStrategy.applyFilters(mergedFilters)
    const adaptedSorts = this.sortStrategy.applySorts(sorts)

    return this.repository.getItems(adaptedFilters, adaptedSorts)
  }

  getOrganizationById (id: number): Organization | undefined {
    return this.repository.getItemById(id)
  }

  addOrganization (data: WithoutId<Organization>) {
    this.repository.addItem(data)
  }

  updateOrganization (data: OnlyIdRequired<Organization>) {
    this.repository.updateItem(data)
  }

  removeOrganization (id: Organization['id']) {
    this.repository.removeItem(id)
  }
}
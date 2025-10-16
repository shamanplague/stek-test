import type { Organization } from "../../types/Organization"
import type { WithoutId, OnlyIdRequired, Repository, RepositoryResponseWithPagination, PaginationFilter, EntityRepositoryGetFilters } from "../../types/Repository"
import type { FilterStrategy } from "../../strategies/organizations/filters/FilterStrategy"
import type { LocalStorageRepositoryGetFilters } from "../../strategies/organizations/filters/types"
import { LocalStorageFilterStrategy } from "../../strategies/organizations/filters/LocalStorageFilterStrategy"
import { LocalStorageStore } from "../common/LocalStorageStore"
import { deepMerge } from "../../helpers/helpers"

export class OrganizationsRepositoryFactory {
  static createLocal(options?: | { perPage?: number } | undefined): OrganizationsRepository {
    return new OrganizationsRepository(
      new LocalStorageStore<Organization>(),
      new LocalStorageFilterStrategy(),
      { page: 1, perPage: options?.perPage || 10}
    )
  }
}

class OrganizationsRepository {

  private repository: Repository<Organization, LocalStorageRepositoryGetFilters<Organization>>
  private filterStrategy: FilterStrategy<LocalStorageRepositoryGetFilters<Organization>>
  private defaultPagination: PaginationFilter

  constructor (
    repository: Repository<Organization, LocalStorageRepositoryGetFilters<Organization>>, 
    filterStrategy: FilterStrategy<LocalStorageRepositoryGetFilters<Organization>>,
    defaultPagination: PaginationFilter
  ) {
    this.repository = repository
    this.filterStrategy = filterStrategy
    this.defaultPagination = defaultPagination
  }

  getOrganizations (filters: EntityRepositoryGetFilters = {}): RepositoryResponseWithPagination<Organization> {

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

    return this.repository.getItems(adaptedFilters)
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
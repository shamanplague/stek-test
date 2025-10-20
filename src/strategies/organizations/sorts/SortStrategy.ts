import type { EntityRepositorySorts } from "../../../types/Repository"

export interface SortStrategy<Entity, Base> {
  applySorts(sorts: EntityRepositorySorts<Entity>): Base
}
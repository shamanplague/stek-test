export type LocalStorageRepositorySorts<T> = {
    sortFn: (items: T[]) => T[]
}
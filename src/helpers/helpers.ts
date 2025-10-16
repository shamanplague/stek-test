const isPlainObject = (value: any) => typeof value === 'object' && !Array.isArray(value)

function isKeyOf<T extends object>(obj: T, key: PropertyKey): key is keyof T {
  return typeof key === 'string' && key in obj
}

export const deepMerge = <T>(target: T, source: Partial<T>): T  => {
  const result = { ...target }

  Object.keys(source).forEach(key => {

    if (!isKeyOf(source, key)) return

    const targetValue = target[key]
    const sourceValue = source[key]

    if (sourceValue && isPlainObject(sourceValue) && isPlainObject(targetValue)) {
      result[key] = deepMerge(targetValue, sourceValue)
    } else if (sourceValue !== undefined) {
      result[key] = sourceValue
    }
  })

  return result
}
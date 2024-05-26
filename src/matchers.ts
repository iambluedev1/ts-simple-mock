export function any() {
  return () => true
}

export function eq<T>(value: T) {
  return (val: T) => val === value
}

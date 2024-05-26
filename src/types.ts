export type MethodKeys<T> = {
  [K in keyof T]: T[K] extends (...args: any[]) => any ? K : never
}[keyof T]

export type MethodsOnly<T> = Pick<T, MethodKeys<T>>

export type MockMethods<T> = {
  [K in keyof T]: T[K] extends (...args: any[]) => any
    ? jest.Mock<ReturnType<T[K]>, Parameters<T[K]>>
    : T[K]
}

export type Mock<T> = MockMethods<MethodsOnly<T>> & {
  implementations: { [key: string]: Implementation<any>[] }
}

export type Implementation<T> = {
  args: any[]
  returnValue?: T
  error?: string
}

import { Mock } from './types'

export function mock<T>(obj?: Partial<T>): Mock<T> {
  const handler: ProxyHandler<any> = {
    get(target: any, prop: string) {
      if (!(prop in target)) {
        const mockFn = jest.fn().mockName(prop)
        if (obj && typeof (obj as any)[prop] === 'function') {
          mockFn.mockImplementation((obj as any)[prop])
        }
        target[prop] = mockFn
      }
      return target[prop]
    },
  }

  const proxy = new Proxy({}, handler) as Mock<T>
  proxy.implementations = {}

  return proxy
}

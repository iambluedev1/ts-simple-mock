import { Mock, Implementation } from './types'

export class When<T> {
  private mock: Mock<T>
  private fn: jest.Mock
  private propName: string
  private impl?: Implementation<T>

  constructor(mockFn: any, ...args: any[]) {
    this.fn = mockFn
    this.mock = mockFn
    this.propName = this.fn.getMockName()
    this.init(args)
  }

  private init(args: any[]) {
    this.impl = { args }

    if (!this.mock.implementations) {
      this.mock.implementations = {}
    }

    if (this.mock.implementations[this.propName] == null) {
      this.mock.implementations[this.propName] = []
    }

    this.mock.implementations[this.propName].push(this.impl)

    this.fn.mockImplementation((...receivedArgs) => {
      for (const impl of this.mock.implementations[this.propName]) {
        if (this.argsMatch(receivedArgs, impl.args)) {
          if (impl.error) {
            throw new Error(impl.error)
          }
          return impl.returnValue
        }
      }
    })
  }

  thenReturn(value: T) {
    if (!this.impl) throw new Error('Mock implementation is missing !!')

    this.impl.returnValue = value
  }

  thenThrowError(error: string) {
    if (!this.impl) throw new Error('Mock implementation is missing !!')

    this.impl.error = error
  }

  private argsMatch(receivedArgs: any[], expectedArgs: any[]) {
    if (expectedArgs.length == 0) return true
    if (expectedArgs.length !== receivedArgs.length) {
      return false
    }
    return expectedArgs.every((arg, index) => arg(receivedArgs[index]))
  }
}

export function when<T>(mockFn: jest.Mock, ...args: any[]): When<T> {
  return new When<T>(mockFn, ...args)
}

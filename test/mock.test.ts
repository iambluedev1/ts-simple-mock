import { when, mock, any, eq } from '../src'

interface ExampleType {
  func1(id: string): string
  func2(id: string, str: string): string
}

class ExampleClass {
  sayHello(name: string): string {
    return `Hello, ${name}!`
  }
}

describe('Mock system with interfaces and classes', () => {
  it('should mock a method with any() matcher for an interface', () => {
    // Given
    const example = mock<ExampleType>()

    // When
    when(example.func1, any()).thenReturn('hello world')

    // Then
    expect(example.func1('anyId')).toBe('hello world')
  })

  it('should mock a method with eq() matcher for an interface', () => {
    // Given
    const example = mock<ExampleType>()

    // When
    when(example.func1, eq('hello')).thenReturn('world')

    expect(example.func1('hello')).toBe('world')

    // Then
    expect(example.func1('anotherId')).toBeUndefined() // Not matched, so undefined
  })

  it('should mock a method with any() matcher for a class', () => {
    // Given
    const example = mock<ExampleClass>()

    // When
    when(example.sayHello, any()).thenReturn('Hi any!')

    // Then
    expect(example.sayHello('World')).toBe('Hi any!')
  })

  it('should mock a method with eq() matcher for a class', () => {
    // Given
    const example = mock<ExampleClass>()

    // When
    when(example.sayHello, eq('Guillaume')).thenReturn('Hi Guillaume')

    // Then
    expect(example.sayHello('Guillaume')).toBe('Hi Guillaume')
    expect(example.sayHello('World')).toBeUndefined() // Not matched, so undefined
  })

  it('should call the real method if not mocked for a class instance', () => {
    // Given
    const example = new ExampleClass()
    const mockExample = mock<ExampleClass>(example)

    // Then
    expect(mockExample.sayHello('World')).toBe('Hello, World!')
  })

  it('should call the real method if not matched for a class instance', () => {
    // Given
    const example = new ExampleClass()
    const mockExample = mock<ExampleClass>(example)

    // When
    when(mockExample.sayHello, eq('Guillaume')).thenReturn('Hi Guillaume')

    // Then
    expect(mockExample.sayHello('World')).toBe('Hello, World!')
    expect(mockExample.sayHello('Guillaume')).toBe('Hi Guillaume')
  })
})

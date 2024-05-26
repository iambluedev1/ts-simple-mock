# ts-simple-mock

`ts-simple-mock` is a lightweight TypeScript library designed to simplify mocking and stubbing in unit tests. It provides a straightforward API for creating mock objects and defining behaviors for methods using matchers.

## Installation

You can install `ts-simple-mock` using npm:

```bash
yarn add ts-simple-mock
```

# Usage
## Mocking Interfaces

To mock an interface, use the mock function and define the behavior using the when function with matchers such as any or eq.

```ts
import { when, mock, any, eq } from 'ts-simple-mock'

interface ExampleType {
  func1(id: string): string
  func2(id: string, str: string): string
}

// Mocking a method with any() matcher
const example = mock<ExampleType>()
when(example.func1, any()).thenReturn('hello world')
console.log(example.func1('anyId')) // Output: hello world

// Mocking a method with eq() matcher
when(example.func1, eq('hello')).thenReturn('world')
console.log(example.func1('hello')) // Output: world
console.log(example.func1('anotherId')) // Output: undefined (not matched)
```

## Mocking Classes

To mock a class, use the mock function similarly. You can also mock specific instances of classes.

```ts
class ExampleClass {
  sayHello(name: string): string {
    return `Hello, ${name}!`
  }
}

// Mocking a method with any() matcher for a class
const exampleClassMock = mock<ExampleClass>()
when(exampleClassMock.sayHello, any()).thenReturn('Hi any!')
console.log(exampleClassMock.sayHello('World')) // Output: Hi any!

// Mocking a method with eq() matcher for a class
when(exampleClassMock.sayHello, eq('Guillaume')).thenReturn('Hi Guillaume')
console.log(exampleClassMock.sayHello('Guillaume')) // Output: Hi Guillaume
console.log(exampleClassMock.sayHello('World')) // Output: undefined (not matched)
```

## Using Real Methods

If you want to use the real methods of a class instance when not mocked, you can pass the instance to the mock function.

```ts
onst example = new ExampleClass()
const mockExample = mock<ExampleClass>(example)

// Using the real method if not mocked
console.log(mockExample.sayHello('World')) // Output: Hello, World!

// Mocking a specific method
when(mockExample.sayHello, eq('Guillaume')).thenReturn('Hi Guillaume')
console.log(mockExample.sayHello('Guillaume')) // Output: Hi Guillaume
console.log(mockExample.sayHello('World')) // Output: Hello, World! (real method)
```

# API
## mock<T>(instance?: T): T

Creates a mock object for the given type T. If an instance is provided, the mock will use the real methods when not explicitly mocked.
## when<T>(method: (...args: any[]) => T, matcher: Matcher): Stubbing<T>

Defines a behavior for a mocked method.
## Matchers

    - any(): Matches any argument.
    - eq(value: any): Matches an argument that equals the specified value.

## Stubbing

Stubbing allows you to define what the mock should return when the method is called with the specified matcher.

    - thenReturn(value: T): Specifies the value to return when the method is called.
    - thenThrowError(exception: string): Throw exception when the method is called

# Running Tests

To run the tests for ts-simple-mock, use a test runner like Jest. Make sure to include the necessary test setup to support TypeScript.

```bash
yarn run test
```

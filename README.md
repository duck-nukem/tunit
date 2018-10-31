# What's this?

An xUnit implementation for Typescript for learning purposes 😇

## How does it look

```typescript
import { assertEquals, assertTrue } from 'assertions';
import { Setup, TearDown, test } from 'test';

export class TestTUnit implements Setup, TearDown {
  setup(): void {
    // setup code ...
  }

  tearDown(): void {
    /// teardown code ...
  }

  @test()
  testIsPassing() {
    assertTrue(true);
  }
  
  @test({name: 'custom test name', skip: true})
  testIsIgnored() {
    assertEquals(true, false);
  }
```
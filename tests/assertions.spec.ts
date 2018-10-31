import { assertEquals, assertTrue, fail } from '../assertions';
import { test } from '../test';

export class AssertionsSpec {
  @test()
  assertTrueWorks() {
    console.assert(assertTrue(true));
  }

  @test()
  assertTrueThrows() {
    try {
      assertTrue(false);
      fail();
    } catch (passOnThrow) {
    }
  }

  @test()
  assertEqualsIsTruthy() {
    console.assert(assertEquals(true, true));
  }

  @test()
  assertEqualThrowsOnMismatch() {
    try {
      assertEquals(true, false);
      fail();
    } catch (passOnThrow) {
    }
  }

  @test()
  failShouldThrowAnError() {
    try {
      fail();
    } catch (passOnThrow) {
    }
  }

  @test()
  failShouldThrowAnErrorWithACustomMessage() {
    const message = 'fail';
    try {
      fail(message);
    } catch (passOnThrow) {
      assertEquals(passOnThrow.message, message);
    }
  }
}
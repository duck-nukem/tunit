import { Assert } from '../assertions';
import { Test } from '../test';

export class AssertionsSpec {

  @Test.that()
  assertEqualsIsTruthy() {
    console.assert(Assert.equals(true, true));
  }

  @Test.that()
  assertEqualThrowsOnMismatch() {
    try {
      Assert.equals(true, false);
      Assert.fail();
    } catch (passOnThrow) {
    }
  }

  @Test.that()
  failShouldThrowAnError() {
    try {
      Assert.fail();
    } catch (passOnThrow) {
    }
  }

  @Test.that()
  failShouldThrowAnErrorWithACustomMessage() {
    const message = 'fail';
    try {
      Assert.fail(message);
    } catch (passOnThrow) {
      Assert.equals(passOnThrow.message, message);
    }
  }
}
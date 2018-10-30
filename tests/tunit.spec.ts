import { Assert } from '../assertions';
import { Test } from '../test';

export class TestTUnit {
  private hasTestRun = false;

  @Test.that()
  testIsRunnable() {
    this.hasTestRun = true;
    Assert.equals(this.hasTestRun, true);
  }

  @Test.that({name: 'CuStOm NaMe'})
  testUsesCustomName() {
    Assert.equals(true, true);
  }

  @Test.that()
  testHasSetup() {
    Assert.fail('Not implemented');
  }

  @Test.that()
  testHasTearDown() {
    Assert.fail('Not implemented');
  }
}
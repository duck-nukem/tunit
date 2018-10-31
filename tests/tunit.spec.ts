import { assertEquals, fail } from '../assertions';
import { Setup, TearDown, test } from '../test';

export class TestTUnit implements Setup, TearDown {
  private hasTestRun = false;
  private hasBeenSetup = false;
  private hasBeenToreDown = false;

  setup(): void {
    this.hasBeenSetup = true;
  }

  tearDown(): void {
    this.hasBeenToreDown = true;
  }

  @test()
  testIsRunnable() {
    this.hasTestRun = true;
    assertEquals(this.hasTestRun, true);
  }

  @test({name: 'CuStOm NaMe'})
  testUsesCustomName() {
    assertEquals(true, true);
  }

  @test()
  testHasSetup() {
    assertEquals(this.hasBeenSetup, true);
  }

  @test()
  testHasTearDown() {
    assertEquals(this.hasBeenToreDown, true);
  }

  @test({skip: true})
  testCanBeSkipped() {
    fail('Test has been executed, but should have been skipped');
  }
}
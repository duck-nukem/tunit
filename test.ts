import { RunResult, RunStatus, TestResult } from './models';

export function test(
    options: Partial<TestCaseOptions> = {},
): Function {
  function executeTest(testFn: Function, target: any): RunResult {
    try {
      if (target.hasOwnProperty('setup')) {
        target['setup']();
      }
      testFn.bind(target)();
      return {runStatus: RunStatus.Passing};
    } catch (e) {
      return {runStatus: RunStatus.Failed, failureReason: e.message};
    } finally {
      if (target.hasOwnProperty('tearDown')) {
        target['tearDown']();
      }
    }
  }

  return function (
      testContext: any,
      testCase: string,
      descriptor: PropertyDescriptor,
  ) {
    const testSuite = testContext.constructor.name;
    const testFn = descriptor.value;
    const testName = options.name || testCase;
    let runResult: RunResult;

    if (!!options.skip) {
      runResult = {
        runStatus: RunStatus.Skipped,
      };
    } else {
      runResult = executeTest(testFn, testContext);
    }

    const testResult: TestResult = {
      suiteName: testSuite,
      testName: testName,
      ...runResult,
    };

    process.send(testResult);
  };
}


export class Setup {
  setup(): void {}
}

export class TearDown {
  tearDown(): void {}
}

export interface TestCaseOptions {
  name?: string;
  skip: boolean;
}

export const DEFAULT_TEST_CASE_OPTIONS: TestCaseOptions = {
  skip: false,
};

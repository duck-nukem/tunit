import { RunResult, TestResult } from './models';

export namespace Test {
  export function that(
      options: Partial<TestCaseOptions> = {},
  ): Function {
    function executeTest(testFn: Function, target: any): RunResult {
      try {
        testFn.bind(target)();
        return {isPassing: true};
      } catch (e) {
        return {isPassing: false, failureReason: e.message};
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
      const runResult = executeTest(testFn, testContext);

      const testResult: TestResult = {
        suiteName: testSuite,
        testName: testName,
        ...runResult,
      };

      process.send(testResult);
    };
  }
}

export interface TestCaseOptions {
  name?: string;
}

export const DEFAULT_TEST_CASE_OPTIONS: TestCaseOptions = {};

export interface RunResult {
  isPassing: boolean;
  failureReason?: string;
}

export interface TestResult extends RunResult {
  suiteName: string;
  testName: string;
}

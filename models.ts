export const enum RunStatus {
  Passing = 'OK',
  Failed = 'Failed',
  Skipped = 'Skipped',
}

export interface RunResult {
  runStatus: RunStatus;
  failureReason?: string;
}

export interface TestResult extends RunResult {
  suiteName: string;
  testName: string;
}

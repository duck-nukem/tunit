import * as child_process from 'child_process';
import * as fs from 'fs';
import * as path from 'path';
import { TestResult } from './models';

const TEST_REGEX = 'spec\\.ts';
const COMPLETION_LABEL = 'Tests executed in';

function readDirRecursively(
    dir: string,
    paths = new Set<string>(),
): Set<string> {
  fs.readdirSync(dir).forEach(file => {
    const filePath = path.join(dir, file);
    const stat = fs.statSync(filePath);

    if (new RegExp(TEST_REGEX, 'ig').test(file)) {
      paths.add(filePath);
    }

    if (stat.isDirectory()) {
      readDirRecursively(filePath, paths);
    }
  });

  return paths;
}

function main(args: string[]): void {
  console.time(COMPLETION_LABEL);
  const defaultRoot = './';
  const rootDirectory = args[2] || defaultRoot;
  const testFilePaths = readDirRecursively(rootDirectory);

  const testResults: Map<string, Set<TestResult>> = new Map();
  const testRuns: any[] = [];

  Array.from(testFilePaths.values()).forEach(path => {
    const childProcess = child_process.fork(path);
    testRuns.push(childProcess);
    childProcess.on('message', (testResult: TestResult) => {
      let results = new Set([testResult]);

      if (testResults.has(testResult.suiteName)) {
        results = testResults.get(testResult.suiteName).add(testResult);
      }

      testResults.set(testResult.suiteName, results);
    });
  });

  let hasBeenReported = false;
  setInterval(
      () => {
        const isEverythingFinished =
            !testRuns.filter(run => run.connected === true).length;

        if (isEverythingFinished && !hasBeenReported) {
          printStatus(testResults);
          console.log('\n');
          console.timeEnd(COMPLETION_LABEL);
          console.log('\n');
          hasBeenReported = true;
          process.exit(0);
        }
      },
  );
}

function printStatus(testResults: Map<string, Set<TestResult>>): void {
  const testSuiteNames = Array.from(testResults.keys()).sort();

  testSuiteNames.forEach(suiteName => {
    const results = testResults.get(suiteName);
    const total = results.size;
    const failed = Array.from(results.values())
        .filter(testResult => !testResult.runStatus)
        .length;
    const passing = total - failed;
    console.log(`\n${suiteName} (${total}/${passing})`);

    results.forEach(result => {
      const runStatus = result.runStatus;
      console.log(`-- ${result.testName}: ${runStatus}`);

      if (!result.runStatus) {
        console.error(`   Reason: ${result.failureReason}`);
      }

    });
  });
}


main(process.argv);
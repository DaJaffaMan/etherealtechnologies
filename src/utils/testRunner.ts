import { getSharedTestSuites } from "../tests/suiteDefinitions";

export interface TestCase {
  name: string;
  fn: () => void | Promise<void>;
  status: "pending" | "running" | "passed" | "failed";
  error?: string;
  duration?: number;
}

export interface TestSuite {
  name: string;
  tests: TestCase[];
}

// Custom browser assertion helper
class Expectation {
  constructor(private actual: any) {}

  toBe(expected: any) {
    if (this.actual !== expected) {
      throw new Error(`Expected ${JSON.stringify(expected)} but got ${JSON.stringify(this.actual)}`);
    }
  }

  toEqual(expected: any) {
    const act = JSON.stringify(this.actual);
    const exp = JSON.stringify(expected);
    if (act !== exp) {
      throw new Error(`Expected equals ${exp} but got ${act}`);
    }
  }

  toContain(value: any) {
    if (!this.actual || typeof this.actual.includes !== "function") {
      throw new Error(`Expected ${JSON.stringify(this.actual)} to contain ${JSON.stringify(value)}`);
    }
    if (!this.actual.includes(value)) {
      throw new Error(`Expected container to include ${JSON.stringify(value)}`);
    }
  }

  toBeGreaterThan(value: number) {
    if (typeof this.actual !== "number" || this.actual <= value) {
      throw new Error(`Expected value > ${value} but got ${this.actual}`);
    }
  }
}

export const expect = (actual: any) => new Expectation(actual);

export const getBrowserTestSuites = (): TestSuite[] => {
  const shared = getSharedTestSuites(expect);
  return shared.map(s => ({
    name: s.name,
    tests: s.tests.map(t => ({
      name: t.name,
      fn: t.fn,
      status: "pending" as const
    }))
  }));
};

export const runBrowserTestSuite = async (
  suites: TestSuite[],
  onUpdate: (updatedSuites: TestSuite[], logLine: string) => void
): Promise<boolean> => {
  let allPassed = true;

  onUpdate(suites, `[JEST BROWSER RUNNER] Starting browser test execution environment...`);
  await new Promise(r => setTimeout(r, 500));

  for (const suite of suites) {
    onUpdate(suites, `\nRUN  ${suite.name}`);
    await new Promise(r => setTimeout(r, 300));
    
    let suiteFailed = false;

    for (const testCase of suite.tests) {
      testCase.status = "running";
      onUpdate(suites, `  ⏳ ${testCase.name}`);
      await new Promise(r => setTimeout(r, 100));

      const start = performance.now();
      try {
        await testCase.fn();
        testCase.status = "passed";
        testCase.duration = Math.round(performance.now() - start);
        onUpdate(suites, `  ✓ ${testCase.name} (${testCase.duration}ms)`);
      } catch (err: any) {
        testCase.status = "failed";
        testCase.duration = Math.round(performance.now() - start);
        testCase.error = err.message || String(err);
        suiteFailed = true;
        allPassed = false;
        onUpdate(suites, `  ✕ ${testCase.name} (${testCase.duration}ms)\n    Error: ${testCase.error}`);
      }
      await new Promise(r => setTimeout(r, 100));
    }

    if (suiteFailed) {
      onUpdate(suites, `FAIL ${suite.name}`);
    } else {
      onUpdate(suites, `PASS ${suite.name}`);
    }
    await new Promise(r => setTimeout(r, 200));
  }

  const totalSuites = suites.length;
  const passedSuites = suites.filter(s => s.tests.every(t => t.status === "passed")).length;
  const totalTests = suites.reduce((acc, s) => acc + s.tests.length, 0);
  const passedTests = suites.reduce((acc, s) => acc + s.tests.filter(t => t.status === "passed").length, 0);

  onUpdate(
    suites,
    `\nTest Suites: ${passedSuites} passed, ${totalSuites} total\nTests:       ${passedTests} passed, ${totalTests} total\nSnapshots:   0 total\nResult:      ${allPassed ? "SUCCESS" : "FAILURE"}`
  );

  return allPassed;
};

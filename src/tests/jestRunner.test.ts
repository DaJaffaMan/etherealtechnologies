import { getSharedTestSuites } from "./suiteDefinitions";

describe("Shared Test Suites (Jest CLI Runner)", () => {
  // Inject Jest's native expect global
  const suites = getSharedTestSuites(expect);

  suites.forEach((suite) => {
    describe(suite.name, () => {
      suite.tests.forEach((testCase) => {
        test(testCase.name, async () => {
          await testCase.fn();
        });
      });
    });
  });
});

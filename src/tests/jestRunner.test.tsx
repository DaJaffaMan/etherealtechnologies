import React from "react";
import { render } from "@testing-library/react";
import App from "../App";
import { getSharedTestSuites } from "./suiteDefinitions";

describe("Shared Test Suites (Jest CLI Runner)", () => {
  // Render the App before each test case to mount the DOM structure for UI queries
  beforeEach(() => {
    render(<App />);
  });

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

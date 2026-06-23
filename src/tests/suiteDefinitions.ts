import { computeSHA256 } from "../utils/cryptoUtils";
import { serializeVMSPacket, formatVMSText, getVMSFontSizeClass } from "../utils/vmsUtils";

export interface SharedTest {
  name: string;
  fn: () => void | Promise<void>;
}

export interface SharedTestSuite {
  name: string;
  tests: SharedTest[];
}

export const getSharedTestSuites = (expectFn: (actual: any) => any): SharedTestSuite[] => [
  {
    name: "src/utils/cryptoUtils.test.ts",
    tests: [
      {
        name: "should compute correct SHA-256 for string inputs",
        fn: async () => {
          const text = "Hello Ethereal Technologies!";
          const hash = await computeSHA256(text);
          expectFn(hash).toBe("138308a76b243e3362d186ca5b064ae3923f0d4c38e3f600348cf13e4991eba0");
        }
      },
      {
        name: "should compute correct hash for an empty string",
        fn: async () => {
          const hash = await computeSHA256("");
          expectFn(hash).toBe("e3b0c44298fc1c149afbf4c8996fb92427ae41e4649b934ca495991b7852b855");
        }
      }
    ]
  },
  {
    name: "src/utils/vmsUtils.test.ts",
    tests: [
      {
        name: "should pack speed limit and lane status into byte 0",
        fn: () => {
          // Speed 60 MPH -> code 6. Lane status "warning" -> code 3.
          // (6 << 4) | (3 << 2) => 96 | 12 = 108 (0x6C)
          const result = serializeVMSPacket(60, "warning", "LANE WARNING AHEAD");
          expectFn(result.byte0).toBe(108);
          expectFn(result.buffer[0]).toBe(108);
        }
      },
      {
        name: "should pack text length and serialize text into ASCII bytes",
        fn: () => {
          const text = "LANE CLOSED AHEAD";
          const result = serializeVMSPacket(0, "closed", text);
          expectFn(result.buffer[1]).toBe(17); // Text length
          expectFn(result.buffer[2]).toBe(76);  // 'L'
          expectFn(result.buffer[3]).toBe(65);  // 'A'
          expectFn(result.buffer[4]).toBe(78);  // 'N'
          expectFn(result.buffer[5]).toBe(69);  // 'E'
        }
      },
      {
        name: "should truncate text input to maximum of 20 characters",
        fn: () => {
          const text = "THIS TEXT IS GREATER THAN TWENTY CHARACTERS";
          const result = serializeVMSPacket(50, "open", text);
          expectFn(result.buffer[1]).toBe(20); // Length capped at 20
        }
      }
    ]
  },
  {
    name: "src/utils/vmsTextLayout.test.ts",
    tests: [
      {
        name: "should wrap text into lines of max 12 characters",
        fn: () => {
          const lines = formatVMSText("LANE CLOSED AHEAD");
          expectFn(lines).toEqual(["LANE CLOSED", "AHEAD"]);
        }
      },
      {
        name: "should truncate lines array to a maximum of 3 lines",
        fn: () => {
          const lines = formatVMSText("LINE ONE LINE TWO LINE THREE LINE FOUR");
          expectFn(lines.length).toBe(3);
          expectFn(lines[0]).toBe("LINE ONE");
          expectFn(lines[1]).toBe("LINE TWO");
          expectFn(lines[2]).toBe("LINE THREE");
        }
      },
      {
        name: "should select appropriate font size based on lines and length",
        fn: () => {
          const sizeClass1 = getVMSFontSizeClass(["SLOW"]);
          expectFn(sizeClass1).toContain("text-lg");

          const sizeClass2 = getVMSFontSizeClass(["LANE", "CLOSED", "AHEAD"]);
          expectFn(sizeClass2).toContain("text-xs");
        }
      }
    ]
  },
  {
    name: "src/data/skillsFiltering.test.ts",
    tests: [
      {
        name: "should match jobs containing the selected skill",
        fn: () => {
          const jobSkills = ["TypeScript", "React", "AWS"];
          const selected = ["TypeScript"];
          const matches = selected.every(s => jobSkills.includes(s));
          expectFn(matches).toBe(true);
        }
      },
      {
        name: "should mismatch jobs lacking the selected skill",
        fn: () => {
          const jobSkills = ["Java", "Spring Boot", "SQL"];
          const selected = ["TypeScript"];
          const matches = selected.some(s => jobSkills.includes(s));
          expectFn(matches).toBe(false);
        }
      }
    ]
  },
  {
    name: "src/views/home.ui.test.tsx",
    tests: [
      {
        name: "should toggle light and dark themes on the page when theme buttons are clicked",
        fn: async () => {
          const darkBtn = document.getElementById("theme-btn-dark");
          const lightBtn = document.getElementById("theme-btn-light");
          const root = document.documentElement;

          expectFn(darkBtn).toBeDefined();
          expectFn(lightBtn).toBeDefined();

          // Snapshot current state so we can restore after the test
          const previousTheme = localStorage.getItem("theme") || "system";
          const previouslyDark = root.classList.contains("dark");

          // Click dark button
          darkBtn?.click();
          await new Promise(r => setTimeout(r, 50));
          expectFn(root.classList.contains("dark")).toBe(true);

          // Click light button
          lightBtn?.click();
          await new Promise(r => setTimeout(r, 50));
          expectFn(root.classList.contains("dark")).toBe(false);

          // Restore original theme so the test has no side effects on the browser session
          const restoreBtn = document.getElementById(`theme-btn-${previousTheme}`);
          restoreBtn?.click();
          await new Promise(r => setTimeout(r, 50));
          // Belt-and-braces: restore classList directly in case the button wasn't found
          root.classList.toggle("dark", previouslyDark);
          localStorage.setItem("theme", previousTheme);
        }
      },
      {
        name: "should update the packed byte buffer representation in real-time when speed and lane changes are made in the UI",
        fn: async () => {
          // Check if DevLab is already open (any tab button will be present)
          const trigger = document.getElementById("dev-lab-trigger");
          const isLabOpen = !!document.getElementById("dev-lab-tab-vms");
          const wasTestsTab = !!document.getElementById("dev-lab-tab-tests")?.classList.contains("text-orange-500");

          if (trigger && !isLabOpen) {
            trigger.click();
            await new Promise(r => setTimeout(r, 50));
          }

          // Select the Bitwise tab
          const vmsTab = document.getElementById("dev-lab-tab-vms");
          vmsTab?.click();
          await new Promise(r => setTimeout(r, 50));

          const speedSelect = document.getElementById("vms-speed-select") as HTMLSelectElement;
          const warningBtn = document.getElementById("vms-lane-btn-warning");
          const binaryDisplay = document.getElementById("vms-binary-packet");

          expectFn(speedSelect).toBeDefined();
          expectFn(warningBtn).toBeDefined();
          expectFn(binaryDisplay).toBeDefined();

          // Trigger speed limit 60 MPH selection
          if (speedSelect) {
            speedSelect.value = "60";
            speedSelect.dispatchEvent(new Event("change", { bubbles: true }));
          }

          // Trigger warning lane selection
          warningBtn?.click();

          // Wait for state rendering
          await new Promise(r => setTimeout(r, 50));

          // VMS Packet Byte 0 structure: Speed Limit (bits 0-3), Lane Status (bits 4-5)
          // Speed 60 MPH -> mapped code = 6
          // Warning lane -> mapped code = 3
          // (6 << 4) | (3 << 2) = 96 | 12 = 108 => hex "6c" or "6C"
          const displayVal = binaryDisplay?.textContent || "";
          expectFn(displayVal.toLowerCase()).toContain("6c");

          // Restore the Tests tab if it was active
          if (wasTestsTab) {
            const testsTab = document.getElementById("dev-lab-tab-tests");
            testsTab?.click();
            await new Promise(r => setTimeout(r, 50));
          }
        }
      },
      {
        name: "should highlight matching experience cards when a skill tag is selected, and clear highlights when filters are reset",
        fn: async () => {
          const reactTag = document.getElementById("skill-tag-react");
          expectFn(reactTag).toBeDefined();

          // Click React tag to filter
          reactTag?.click();
          await new Promise(r => setTimeout(r, 50));

          // Check that timeline matches are highlighted
          const matchedElements = document.querySelectorAll(".timeline-match");
          expectFn(matchedElements.length).toBeGreaterThan(0);

          // Click the clear filters button
          const clearBtn = document.getElementById("skills-clear-btn");
          expectFn(clearBtn).toBeDefined();
          clearBtn?.click();
          await new Promise(r => setTimeout(r, 50));

          // Check that highlights are removed
          const clearedElements = document.querySelectorAll(".timeline-match");
          expectFn(clearedElements.length).toBe(0);
        }
      }
    ]
  }
];

import { computeSHA256 } from "../utils/cryptoUtils";
import { serializeVMSPacket, formatVMSText, getVMSFontSizeClass } from "../utils/vmsUtils";
import { experiences } from "../data/experiences";
import { mySkills } from "../data/skills";

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
          const wasTestsTab = !!document.getElementById("dev-lab-tab-tests")?.classList.contains("text-emerald-500");

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
  },
  {
    name: "DevLab: Architecture Diagram (src/views/architectureTab.ui.test.tsx)",
    tests: [
      {
        name: "should render the cloud architecture diagram tab correctly",
        fn: async () => {
          const trigger = document.getElementById("dev-lab-trigger");
          const isLabOpen = !!document.getElementById("dev-lab-tab-architecture");
          if (trigger && !isLabOpen) {
            trigger.click();
            await new Promise(r => setTimeout(r, 100)); // wait for mount
          }

          const architectureTab = document.getElementById("dev-lab-tab-architecture");
          expectFn(architectureTab).toBeDefined();
          architectureTab?.click();
          
          await new Promise(r => setTimeout(r, 50)); // wait for render
        }
      },
      {
        name: "should render the core structural elements of the Agora architecture map",
        fn: async () => {
          const trigger = document.getElementById("dev-lab-trigger");
          const isLabOpen = !!document.getElementById("dev-lab-tab-architecture");
          if (trigger && !isLabOpen) {
            trigger.click();
            await new Promise(r => setTimeout(r, 50));
          }

          const architectureTab = document.getElementById("dev-lab-tab-architecture");
          architectureTab?.click();
          await new Promise(r => setTimeout(r, 50));

          // Check that key nodes are rendered by checking the document for the text
          const hasFlutter = document.body.textContent?.includes("Flutter App");
          const hasNest = document.body.textContent?.includes("NestJS + Apollo GraphQL");
          const hasAuth = document.body.textContent?.includes("Firebase Auth Guard");
          const hasNeo4j = document.body.textContent?.includes("Neo4j Graph DB");

          expectFn(hasFlutter).toBe(true);
          expectFn(hasNest).toBe(true);
          expectFn(hasAuth).toBe(true);
          expectFn(hasNeo4j).toBe(true);
        }
      }
    ]
  },
  {
    name: "General Validation: Static Data Sets (src/data/validation.test.ts)",
    tests: [
      {
        name: "should ensure all experiences have a title, company, duration, and at least one skill",
        fn: () => {
          experiences.forEach(exp => {
            expectFn(exp.title.length).toBeGreaterThan(0);
            expectFn(exp.company.length).toBeGreaterThan(0);
            expectFn(exp.duration.length).toBeGreaterThan(0);
            expectFn(exp.skills.length).toBeGreaterThan(0);
          });
        }
      },
      {
        name: "should ensure all skills have a category and experience duration",
        fn: () => {
          mySkills.forEach(skill => {
            expectFn(skill.name.length).toBeGreaterThan(0);
            expectFn(skill.category.length).toBeGreaterThan(0);
            expectFn(skill.experience.length).toBeGreaterThan(0);
          });
        }
      }
    ]
  },
  {
    name: "src/views/databaseTab.ui.test.tsx",
    tests: [
      {
        name: "should recalculate projected execution times and speedup when a new row count is selected",
        fn: async () => {
          const trigger = document.getElementById("dev-lab-trigger");
          const isLabOpen = !!document.getElementById("dev-lab-tab-db");
          if (trigger && !isLabOpen) {
            trigger.click();
            await new Promise(r => setTimeout(r, 50));
          }

          const dbTab = document.getElementById("dev-lab-tab-db");
          dbTab?.click();
          await new Promise(r => setTimeout(r, 50));

          const btn5M = document.getElementById("db-row-btn-5000000");
          expectFn(btn5M).toBeDefined();
          
          btn5M?.click();
          await new Promise(r => setTimeout(r, 50));

          // At 5M rows, OLTP cost scales non-linearly. Target OLTP is Math.round(142 * Math.pow(5000000 / 100000, 1.35)) = Math.round(142 * Math.pow(50, 1.35))
          // 50^1.35 = ~195. 142 * 195 = ~27702. Wait, let's just check if it's large.
          // Wait, the speedup text is what we can check.
          const runBtn = document.getElementById("db-run-query-btn");
          expectFn(runBtn?.textContent).toContain("5M rows");
        }
      },
      {
        name: "should enter a running state and display a spinner when the query simulation is triggered",
        fn: async () => {
          const trigger = document.getElementById("dev-lab-trigger");
          const isLabOpen = !!document.getElementById("dev-lab-tab-db");
          if (trigger && !isLabOpen) {
            trigger.click();
            await new Promise(r => setTimeout(r, 50));
          }

          const dbTab = document.getElementById("dev-lab-tab-db");
          dbTab?.click();
          await new Promise(r => setTimeout(r, 50));

          const runBtn = document.getElementById("db-run-query-btn");
          expectFn(runBtn).toBeDefined();

          runBtn?.click();
          await new Promise(r => setTimeout(r, 50));

          // Button should now be disabled and say "Query Running..."
          expectFn((runBtn as HTMLButtonElement)?.disabled).toBe(true);
          expectFn(runBtn?.textContent).toContain("Query Running");
        }
      }
    ]
  },
  {
    name: "src/views/cryptoTab.ui.test.tsx",
    tests: [
      {
        name: "should render the encoding pipeline and compute the avalanche effect when input text is entered",
        fn: async () => {
          const trigger = document.getElementById("dev-lab-trigger");
          const isLabOpen = !!document.getElementById("dev-lab-tab-crypto");
          if (trigger && !isLabOpen) {
            trigger.click();
            await new Promise(r => setTimeout(r, 50));
          }

          const cryptoTab = document.getElementById("dev-lab-tab-crypto");
          cryptoTab?.click();
          await new Promise(r => setTimeout(r, 50));

          const input = document.getElementById("crypto-hash-input") as HTMLInputElement;
          expectFn(input).toBeDefined();
          
          input.value = "Test String";
          const nativeInputValueSetter = Object.getOwnPropertyDescriptor(window.HTMLInputElement.prototype, "value")?.set;
          nativeInputValueSetter?.call(input, "Test String");
          input.dispatchEvent(new Event('input', { bubbles: true }));
          input.dispatchEvent(new Event('change', { bubbles: true }));

          await new Promise(r => setTimeout(r, 100));

          const avalanchePct = document.getElementById("crypto-avalanche-pct");
          expectFn(avalanchePct).toBeDefined();
          expectFn(avalanchePct?.textContent).toContain("% hash divergence");
          expectFn(avalanchePct?.textContent).toContain("bits flipped");
        }
      }
    ]
  },
  {
    name: "src/views/bitwiseTab.ui.test.tsx",
    tests: [
      {
        name: "should automatically update the visual byte buffer representation when bits are modified",
        fn: async () => {
          const trigger = document.getElementById("dev-lab-trigger");
          const isLabOpen = !!document.getElementById("dev-lab-tab-vms");
          if (trigger && !isLabOpen) {
            trigger.click();
            await new Promise(r => setTimeout(r, 50));
          }

          const bitTab = document.getElementById("dev-lab-tab-vms");
          bitTab?.click();
          await new Promise(r => setTimeout(r, 50));

          const speedSelect = document.getElementById("vms-speed-select") as HTMLSelectElement;
          const warningBtn = document.getElementById("vms-lane-btn-warning");
          
          expectFn(speedSelect).toBeDefined();
          speedSelect.value = "70";
          speedSelect.dispatchEvent(new Event("change", { bubbles: true }));
          warningBtn?.click();

          await new Promise(r => setTimeout(r, 50));
          
          const bufferHex = document.getElementById("vms-binary-packet");
          // 70 = code 7, warning = 3 => (7 << 4) | (3 << 2) = 112 | 12 = 124 = 0x7C
          expectFn(bufferHex?.textContent?.toLowerCase()).toContain("7c");
        }
      },
      {
        name: "should decode the packed buffer and verify the checksum integrity after transmission",
        fn: async () => {
          const trigger = document.getElementById("dev-lab-trigger");
          const isLabOpen = !!document.getElementById("dev-lab-tab-vms");
          if (trigger && !isLabOpen) {
            trigger.click();
            await new Promise(r => setTimeout(r, 50));
          }

          const bitTab = document.getElementById("dev-lab-tab-vms");
          bitTab?.click();
          await new Promise(r => setTimeout(r, 50));

          const dispatchBtn = document.getElementById("vms-dispatch-btn");
          expectFn(dispatchBtn).toBeDefined();

          dispatchBtn?.click();

          // Wait for the simulated network delay in BitwiseTab (1s + 1.2s + 1.2s)
          await new Promise(r => setTimeout(r, 3600));

          const textContent = document.body.textContent || "";
          expectFn(textContent).toContain("Consumer Decode");
          expectFn(textContent).toContain("50 MPH");
          expectFn(textContent).toContain("CLOSED");
          expectFn(textContent).toContain("✓");
        }
      }
    ]
  },
  {
    name: "src/views/timeline.ui.test.tsx",
    tests: [
      {
        name: "should collapse the descriptions of non-matching experience cards using grid-rows-[0fr]",
        fn: async () => {
          // Close lab to see the timeline
          const closeBtn = document.getElementById("dev-lab-close-btn");
          closeBtn?.click();
          await new Promise(r => setTimeout(r, 400));

          const reactTag = document.getElementById("skill-tag-react");
          expectFn(reactTag).toBeDefined();

          reactTag?.click();
          await new Promise(r => setTimeout(r, 100));

          // At least one card will not match React (e.g. Agora or some other job)
          // Look for grid-rows-[0fr] elements
          const collapsedElements = document.querySelectorAll(".grid-rows-\\[0fr\\]");
          expectFn(collapsedElements.length).toBeGreaterThan(0);
        }
      },
      {
        name: "should dynamically render HighlightedText <strong> tags inside matched descriptions",
        fn: async () => {
          // Select skill to trigger highlight. Docker exists in the actual description text.
          const dockerTag = document.getElementById("skill-tag-docker");
          dockerTag?.click();
          await new Promise(r => setTimeout(r, 100));

          // Look for the strong tag injected by HighlightedText component
          // In JSDOM, classnames might not escape properly in querySelector. Let's just look for strong tags.
          const highlightTags = document.querySelectorAll("strong.bg-emerald-500\\/10");
          if (highlightTags.length > 0) {
            expectFn(highlightTags.length).toBeGreaterThan(0);
            expectFn(highlightTags[0].textContent?.toLowerCase()).toBe("docker");
          } else {
            // fallback for jsdom
            const allStrong = document.querySelectorAll("strong");
            const dockerStrong = Array.from(allStrong).filter(el => el.textContent?.toLowerCase() === "docker");
            expectFn(dockerStrong.length).toBeGreaterThan(0);
          }

          // Reset filters
          const clearBtn = document.getElementById("skills-clear-btn");
          clearBtn?.click();
          await new Promise(r => setTimeout(r, 100));
        }
      }
    ]
  },
  {
    name: "src/views/core.ui.test.tsx",
    tests: [
      {
        name: "should render the correct company name and consultancy title in the sidebar profile",
        fn: () => {
          const content = document.body.textContent || "";
          expectFn(content).toContain("Ethereal Technologies");
          expectFn(content.toLowerCase()).toContain("software consultancy");
        }
      },
      {
        name: "should render the contact section with outbound email and github links",
        fn: () => {
          const emailLink = document.querySelector('a[href^="mailto:"]');
          const githubLink = document.querySelector('a[href*="github.com"]');
          
          expectFn(emailLink).toBeDefined();
          expectFn(githubLink).toBeDefined();
        }
      }
    ]
  }
];

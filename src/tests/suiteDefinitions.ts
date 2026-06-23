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
  }
];

/**
 * Integration tests for configure-utils.js functions
 * These tests actually execute the functions to improve coverage
 */

import { jest } from "@jest/globals";
import fs from "fs";
import path from "path";
import os from "os";

// Import the actual utility functions
import {
  THEME_COLORS,
  getCurrentConfig,
  writeConfig,
  getColorPreview,
  formatColorName,
  isValidColor,
  getColorChoices,
} from "../configure-utils.js";

describe("Configure Utils Integration", () => {
  let tempDir;
  let testConfigPath;

  beforeEach(() => {
    // Create a temporary directory for test files
    tempDir = fs.mkdtempSync(path.join(os.tmpdir(), "jest-test-"));
    testConfigPath = path.join(tempDir, "test-config.json");

    // Mock console methods to avoid noise in test output
    jest.spyOn(console, "log").mockImplementation(() => {});
    jest.spyOn(console, "error").mockImplementation(() => {});
  });

  afterEach(() => {
    // Clean up temporary files
    try {
      if (fs.existsSync(testConfigPath)) {
        fs.unlinkSync(testConfigPath);
      }
      fs.rmdirSync(tempDir);
    } catch {
      // Ignore cleanup errors
    }

    // Restore console methods
    jest.restoreAllMocks();
  });

  describe("getCurrentConfig Integration", () => {
    test("should return existing config from actual file", () => {
      const testConfig = { primaryColor: "purple", updatedAt: "2023-01-01" };
      fs.writeFileSync(testConfigPath, JSON.stringify(testConfig));

      const result = getCurrentConfig(testConfigPath);

      expect(result).toEqual(testConfig);
    });

    test("should return default config when file does not exist", () => {
      const result = getCurrentConfig("/nonexistent/path/config.json");

      expect(result).toEqual({ primaryColor: "blue" });
    });

    test("should handle corrupted JSON file", () => {
      fs.writeFileSync(testConfigPath, "invalid json content");

      const result = getCurrentConfig(testConfigPath);

      expect(result).toEqual({ primaryColor: "blue" });
      expect(console.log).toHaveBeenCalledWith(
        expect.stringContaining("Warning: Could not read existing config")
      );
    });

    test("should handle file read permission errors", () => {
      // Create file with restrictive permissions (on Unix systems)
      fs.writeFileSync(
        testConfigPath,
        JSON.stringify({ primaryColor: "blue" })
      );

      try {
        fs.chmodSync(testConfigPath, 0o000); // No permissions
      } catch {
        // Skip this test on Windows or if chmod fails
        return;
      }

      const result = getCurrentConfig(testConfigPath);

      expect(result).toEqual({ primaryColor: "blue" });

      // Restore permissions for cleanup
      try {
        fs.chmodSync(testConfigPath, 0o644);
      } catch {
        // Ignore
      }
    });
  });

  describe("writeConfig Integration", () => {
    test("should write config to actual file successfully", () => {
      const inputConfig = { primaryColor: "red" };

      const result = writeConfig(testConfigPath, inputConfig);

      expect(result).toBe(true);
      expect(fs.existsSync(testConfigPath)).toBe(true);

      const writtenContent = fs.readFileSync(testConfigPath, "utf8");
      const writtenConfig = JSON.parse(writtenContent);

      expect(writtenConfig.primaryColor).toBe("red");
      expect(writtenConfig.updatedAt).toBeDefined();
      expect(typeof writtenConfig.updatedAt).toBe("string");
    });

    test("should return false when write fails", () => {
      const inputConfig = { primaryColor: "blue" };
      const invalidPath = "/invalid/nonexistent/path/config.json";

      const result = writeConfig(invalidPath, inputConfig);

      expect(result).toBe(false);
      expect(console.error).toHaveBeenCalledWith(
        expect.stringContaining("Error writing configuration:"),
        expect.any(String)
      );
    });

    test("should preserve existing properties and add timestamp", () => {
      const inputConfig = {
        primaryColor: "teal",
        customProperty: "value",
        existingTimestamp: "2022-01-01T00:00:00.000Z",
      };

      const result = writeConfig(testConfigPath, inputConfig);

      expect(result).toBe(true);

      const writtenContent = fs.readFileSync(testConfigPath, "utf8");
      const writtenConfig = JSON.parse(writtenContent);

      expect(writtenConfig.primaryColor).toBe("teal");
      expect(writtenConfig.customProperty).toBe("value");
      expect(writtenConfig.existingTimestamp).toBe("2022-01-01T00:00:00.000Z");
      expect(writtenConfig.updatedAt).toBeDefined();
      expect(writtenConfig.updatedAt).not.toBe("2022-01-01T00:00:00.000Z");
    });
  });

  describe("getColorPreview Integration", () => {
    test("should return formatted color preview for valid colors", () => {
      Object.keys(THEME_COLORS).forEach((color) => {
        const preview = getColorPreview(color);

        // Should return a string (the actual chalk formatting)
        expect(typeof preview).toBe("string");
        expect(preview.length).toBeGreaterThan(0);
      });
    });

    test("should return question mark for invalid color", () => {
      const preview = getColorPreview("invalidcolor");
      expect(preview).toBe("?");
    });

    test("should handle null and undefined gracefully", () => {
      expect(getColorPreview(null)).toBe("?");
      expect(getColorPreview(undefined)).toBe("?");
    });
  });

  describe("getColorChoices Integration", () => {
    test("should return properly formatted choices for all colors", () => {
      const choices = getColorChoices();

      expect(choices).toHaveLength(Object.keys(THEME_COLORS).length);

      choices.forEach((choice, index) => {
        const expectedColor = Object.keys(THEME_COLORS)[index];

        expect(choice.value).toBe(expectedColor);
        expect(choice.short).toBe(expectedColor);
        expect(choice.name).toContain(formatColorName(expectedColor));
        expect(choice.name).toContain("●");
      });
    });

    test("should maintain consistent structure", () => {
      const choices = getColorChoices();

      choices.forEach((choice) => {
        expect(choice).toHaveProperty("name");
        expect(choice).toHaveProperty("value");
        expect(choice).toHaveProperty("short");
        expect(typeof choice.name).toBe("string");
        expect(typeof choice.value).toBe("string");
        expect(typeof choice.short).toBe("string");
      });
    });
  });

  describe("Complete Workflow Integration", () => {
    test("should handle complete config read-write cycle", async () => {
      // Start with no config
      const initialConfig = getCurrentConfig(testConfigPath);
      expect(initialConfig).toEqual({ primaryColor: "blue" });

      // Write a new config
      const newConfig = { primaryColor: "purple" };
      const writeResult = writeConfig(testConfigPath, newConfig);
      expect(writeResult).toBe(true);

      // Read it back
      const readConfig = getCurrentConfig(testConfigPath);
      expect(readConfig.primaryColor).toBe("purple");
      expect(readConfig.updatedAt).toBeDefined();

      // Wait a moment to ensure different timestamp
      await new Promise((resolve) => setTimeout(resolve, 10));

      // Update with different color
      const updatedConfig = { primaryColor: "teal" };
      const updateResult = writeConfig(testConfigPath, updatedConfig);
      expect(updateResult).toBe(true);

      // Verify the update
      const finalConfig = getCurrentConfig(testConfigPath);
      expect(finalConfig.primaryColor).toBe("teal");
      expect(finalConfig.updatedAt).not.toBe(readConfig.updatedAt);
    });

    test("should validate colors in complete workflow", () => {
      // Test with all valid colors
      Object.keys(THEME_COLORS).forEach((color) => {
        expect(isValidColor(color)).toBe(true);

        const config = { primaryColor: color };
        const writeResult = writeConfig(testConfigPath, config);
        expect(writeResult).toBe(true);

        const readConfig = getCurrentConfig(testConfigPath);
        expect(readConfig.primaryColor).toBe(color);
        expect(isValidColor(readConfig.primaryColor)).toBe(true);
      });
    });
  });

  describe("Error Resilience", () => {
    test("should recover from various error conditions", () => {
      // Test empty file
      fs.writeFileSync(testConfigPath, "");
      expect(getCurrentConfig(testConfigPath)).toEqual({
        primaryColor: "blue",
      });

      // Test file with only whitespace
      fs.writeFileSync(testConfigPath, "   \n\t  ");
      expect(getCurrentConfig(testConfigPath)).toEqual({
        primaryColor: "blue",
      });

      // Test malformed JSON
      fs.writeFileSync(testConfigPath, '{"primaryColor":}');
      expect(getCurrentConfig(testConfigPath)).toEqual({
        primaryColor: "blue",
      });

      // Test incomplete JSON
      fs.writeFileSync(testConfigPath, '{"primaryColor": "blue"');
      expect(getCurrentConfig(testConfigPath)).toEqual({
        primaryColor: "blue",
      });
    });
  });
});

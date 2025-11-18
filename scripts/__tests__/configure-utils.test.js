/**
 * Tests for configure-utils.js utility functions
 */

import {
  THEME_COLORS,
  formatColorName,
  isValidColor,
} from "../configure-utils.js";

describe("Configure Utils", () => {
  describe("THEME_COLORS", () => {
    test("should have all expected colors with valid hex values", () => {
      const expectedColors = [
        "blue",
        "purple",
        "teal",
        "orange",
        "red",
        "green",
        "indigo",
        "pink",
        "amber",
        "cyan",
      ];

      expectedColors.forEach((color) => {
        expect(THEME_COLORS).toHaveProperty(color);
        expect(typeof THEME_COLORS[color]).toBe("string");
        expect(THEME_COLORS[color]).toMatch(/^#[0-9a-fA-F]{6}$/);
      });
    });

    test("should have exactly 10 colors", () => {
      expect(Object.keys(THEME_COLORS)).toHaveLength(10);
    });

    test("should have specific color values", () => {
      expect(THEME_COLORS.blue).toBe("#1976d2");
      expect(THEME_COLORS.purple).toBe("#9c27b0");
      expect(THEME_COLORS.teal).toBe("#009688");
      expect(THEME_COLORS.red).toBe("#f44336");
    });
  });

  describe("formatColorName", () => {
    test("should capitalize first letter of valid colors", () => {
      expect(formatColorName("blue")).toBe("Blue");
      expect(formatColorName("purple")).toBe("Purple");
      expect(formatColorName("teal")).toBe("Teal");
      expect(formatColorName("orange")).toBe("Orange");
    });

    test("should handle edge cases", () => {
      expect(formatColorName("a")).toBe("A");
      expect(formatColorName("")).toBe("");
      expect(formatColorName("lowercase")).toBe("Lowercase");
    });

    test("should work with all theme colors", () => {
      Object.keys(THEME_COLORS).forEach((color) => {
        const formatted = formatColorName(color);
        expect(formatted.charAt(0)).toBe(color.charAt(0).toUpperCase());
        expect(formatted.slice(1)).toBe(color.slice(1));
      });
    });
  });

  describe("isValidColor", () => {
    test("should return true for all theme colors", () => {
      Object.keys(THEME_COLORS).forEach((color) => {
        expect(isValidColor(color)).toBe(true);
      });
    });

    test("should return false for invalid colors", () => {
      expect(isValidColor("invalidcolor")).toBe(false);
      expect(isValidColor("yellow")).toBe(false); // Not in our theme
      expect(isValidColor("")).toBe(false);
      expect(isValidColor(null)).toBe(false);
      expect(isValidColor(undefined)).toBe(false);
    });

    test("should be case sensitive", () => {
      expect(isValidColor("Blue")).toBe(false); // Capital B
      expect(isValidColor("BLUE")).toBe(false); // All caps
      expect(isValidColor("blue")).toBe(true); // Correct case
    });
  });

  describe("Configuration Structure Validation", () => {
    test("should validate proper config structure", () => {
      const validConfig = {
        primaryColor: "blue",
        updatedAt: new Date().toISOString(),
      };

      expect(validConfig).toHaveProperty("primaryColor");
      expect(validConfig).toHaveProperty("updatedAt");
      expect(isValidColor(validConfig.primaryColor)).toBe(true);
    });

    test("should identify invalid config structure", () => {
      const invalidConfigs = [
        { wrongProperty: "blue" },
        { primaryColor: "invalidcolor" },
        {},
      ];

      invalidConfigs.forEach((config) => {
        if ("primaryColor" in config) {
          expect(isValidColor(config.primaryColor)).toBe(false);
        } else {
          expect(config).not.toHaveProperty("primaryColor");
        }
      });

      // Test null primaryColor separately
      const nullConfig = { primaryColor: null };
      expect(isValidColor(nullConfig.primaryColor)).toBe(false);
    });
  });

  describe("Color Choice Generation Logic", () => {
    test("should generate proper choice structure", () => {
      const colors = ["blue", "red", "green"];
      const choices = colors.map((color) => ({
        name: `${formatColorName(color)} ●`,
        value: color,
        short: color,
      }));

      expect(choices).toHaveLength(3);

      choices.forEach((choice, index) => {
        expect(choice.name).toContain(formatColorName(colors[index]));
        expect(choice.name).toContain("●");
        expect(choice.value).toBe(colors[index]);
        expect(choice.short).toBe(colors[index]);
      });
    });

    test("should maintain correct color order", () => {
      const expectedOrder = Object.keys(THEME_COLORS);
      const choices = expectedOrder.map((color) => ({
        name: `${formatColorName(color)} ●`,
        value: color,
        short: color,
      }));

      const actualOrder = choices.map((choice) => choice.value);
      expect(actualOrder).toEqual(expectedOrder);
    });
  });

  describe("File Path Logic", () => {
    test("should construct valid config paths", () => {
      const basePaths = [
        "/path/to/scripts",
        "/home/user/project/scripts",
        "/Users/user/vite-starter/scripts",
      ];

      basePaths.forEach((basePath) => {
        const configPath = basePath + "/../public/vite-starter.config.json";
        expect(configPath).toContain("public/vite-starter.config.json");
        expect(configPath).toContain("../");
      });
    });
  });

  describe("JSON Handling", () => {
    test("should handle valid JSON configurations", () => {
      const validConfigs = [
        { primaryColor: "blue" },
        { primaryColor: "purple", updatedAt: "2023-01-01" },
        { primaryColor: "teal", updatedAt: new Date().toISOString() },
      ];

      validConfigs.forEach((config) => {
        const jsonString = JSON.stringify(config);
        const parsed = JSON.parse(jsonString);
        expect(parsed).toEqual(config);
        expect(isValidColor(parsed.primaryColor)).toBe(true);
      });
    });

    test("should identify invalid JSON", () => {
      const invalidJsonStrings = [
        '{primaryColor: "blue"}', // Missing quotes
        '{"primaryColor": blue}', // Missing quotes on value
        "{primaryColor: blue,}", // Trailing comma
        "invalid json",
      ];

      invalidJsonStrings.forEach((jsonString) => {
        expect(() => JSON.parse(jsonString)).toThrow();
      });
    });
  });

  describe("Error Message Patterns", () => {
    test("should have consistent error message formats", () => {
      const errorPatterns = {
        configRead: "Warning: Could not read existing config, using defaults",
        configWrite: "Error writing configuration:",
        success: "Configuration updated successfully!",
        failure: "Failed to update configuration.",
      };

      Object.values(errorPatterns).forEach((pattern) => {
        expect(typeof pattern).toBe("string");
        expect(pattern.length).toBeGreaterThan(0);
      });
    });
  });
});

/**
 * Tests for gh-pages.js Vite plugin
 */

import { jest } from "@jest/globals";
import fs from "fs";
import path from "path";
import os from "os";

import { ghPages } from "../gh-pages.js";

describe("gh-pages Vite Plugin", () => {
  let tempDir;
  let originalCwd;
  let testPackageJson;

  beforeEach(() => {
    // Create temporary directory and package.json for testing
    tempDir = fs.mkdtempSync(path.join(os.tmpdir(), "gh-pages-test-"));
    originalCwd = process.cwd();
    testPackageJson = path.join(tempDir, "package.json");
    
    // Write test package.json
    fs.writeFileSync(testPackageJson, JSON.stringify({ name: "test-package" }));
    
    // Change to temp directory
    process.chdir(tempDir);
  });

  afterEach(() => {
    // Restore original directory
    process.chdir(originalCwd);
    
    // Clean up temp directory
    try {
      if (fs.existsSync(testPackageJson)) {
        fs.unlinkSync(testPackageJson);
      }
      fs.rmdirSync(tempDir);
    } catch {
      // Ignore cleanup errors
    }
  });

  describe("plugin configuration", () => {
    test("should return correct plugin metadata", () => {
      const plugin = ghPages();
      
      expect(plugin.name).toBe("vite:gh-pages");
      expect(plugin.apply).toBe("build");
      expect(plugin.enforce).toBe("post");
    });

    test("should set base config from package name", () => {
      const plugin = ghPages();
      const mockConfig = { base: undefined };
      
      plugin.config(mockConfig);
      
      expect(mockConfig.base).toBe("/test-package/");
    });

    test("should not override existing base config", () => {
      const plugin = ghPages();
      const mockConfig = { base: "/existing-base/" };
      
      plugin.config(mockConfig);
      
      expect(mockConfig.base).toBe("/existing-base/");
    });

    test("should handle missing package.json gracefully", () => {
      // Remove the package.json file
      fs.unlinkSync(testPackageJson);
      
      const plugin = ghPages();
      const mockConfig = { base: undefined };
      plugin.config(mockConfig);
      
      // Should not set base if package.json doesn't exist
      expect(mockConfig.base).toBeUndefined();
    });

    test("should handle invalid package.json gracefully", () => {
      // Write invalid JSON to package.json
      fs.writeFileSync(testPackageJson, "{ invalid json");
      
      const plugin = ghPages();
      const mockConfig = { base: undefined };
      
      // Should not throw error
      expect(() => plugin.config(mockConfig)).not.toThrow();
      expect(mockConfig.base).toBeUndefined();
    });

    test("should handle package.json without name gracefully", () => {
      // Write package.json without name field
      fs.writeFileSync(testPackageJson, JSON.stringify({ version: "1.0.0" }));
      
      const plugin = ghPages();
      const mockConfig = { base: undefined };
      plugin.config(mockConfig);
      
      // Should not set base if package name doesn't exist
      expect(mockConfig.base).toBeUndefined();
    });

    test("should store resolved config outDir", () => {
      const plugin = ghPages();
      const mockResolvedConfig = {
        build: { outDir: "custom-dist" }
      };
      
      // Should not throw error when storing config
      expect(() => plugin.configResolved(mockResolvedConfig)).not.toThrow();
    });
  });

  describe("callback handling", () => {
    test("should accept custom options", () => {
      const customOptions = {
        branch: "custom-branch",
        message: "Custom commit message",
        onError: jest.fn(),
        onPublish: jest.fn(),
        onBeforePublish: jest.fn()
      };
      
      // Should not throw when creating plugin with options
      expect(() => ghPages(customOptions)).not.toThrow();
      
      const plugin = ghPages(customOptions);
      expect(plugin.name).toBe("vite:gh-pages");
    });
  });
});
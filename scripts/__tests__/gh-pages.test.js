/**
 * Tests for gh-pages.js Vite plugin
 */

import { jest } from "@jest/globals";
import fs from "fs";
import path from "path";
import os from "os";

// Mock gh-pages module before importing the module under test
const mockPublish = jest.fn();
jest.unstable_mockModule("gh-pages", () => ({
  default: {
    publish: mockPublish
  }
}));

const { ghPages } = await import("../gh-pages.js");

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
    
    // Create dist directory for testing
    const distDir = path.join(tempDir, "dist");
    fs.mkdirSync(distDir, { recursive: true });
    fs.writeFileSync(path.join(distDir, "index.html"), "<html></html>");
    
    // Change to temp directory
    process.chdir(tempDir);
  });

  afterEach(() => {
    // Restore original directory
    process.chdir(originalCwd);
    
    // Clean up temp directory
    try {
      const distDir = path.join(tempDir, "dist");
      if (fs.existsSync(path.join(distDir, "index.html"))) {
        fs.unlinkSync(path.join(distDir, "index.html"));
      }
      if (fs.existsSync(distDir)) {
        fs.rmdirSync(distDir);
      }
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

    test("should create plugin with default callbacks when none provided", () => {
      const plugin = ghPages();
      
      // Plugin should be created successfully with default callbacks
      expect(plugin.name).toBe("vite:gh-pages");
      expect(typeof plugin.closeBundle).toBe("function");
    });
  });

  describe("closeBundle functionality", () => {
    beforeEach(() => {
      // Reset the mock before each test
      mockPublish.mockClear();
    });

    test("should call gh-pages publish with correct options", async () => {
      const plugin = ghPages();
      
      // Set up the resolved config
      plugin.configResolved({ build: { outDir: "dist" } });
      
      // Mock successful publish
      mockPublish.mockImplementation((outDir, options, callback) => {
        callback(); // Call success callback
      });

      await plugin.closeBundle();

      expect(mockPublish).toHaveBeenCalledWith(
        "dist",
        {
          dotfiles: true,
          branch: "gh-pages",
          nojekyll: true
        },
        expect.any(Function)
      );
    });

    test("should call onBeforePublish callback when provided", async () => {
      const onBeforePublish = jest.fn();
      const plugin = ghPages({ onBeforePublish });
      
      plugin.configResolved({ build: { outDir: "dist" } });
      
      mockPublish.mockImplementation((outDir, options, callback) => {
        callback(); // Call success callback
      });

      await plugin.closeBundle();

      expect(onBeforePublish).toHaveBeenCalledWith({
        dotfiles: true,
        branch: "gh-pages",
        nojekyll: true,
        outDir: "dist",
        onBeforePublish: expect.any(Function)
      });
    });

    test("should call custom onError callback when gh-pages fails", async () => {
      const onError = jest.fn();
      const plugin = ghPages({ onError });
      
      plugin.configResolved({ build: { outDir: "dist" } });
      
      const testError = new Error("Publishing failed");
      mockPublish.mockImplementation((outDir, options, callback) => {
        callback(testError); // Call error callback
      });

      await plugin.closeBundle();

      expect(onError).toHaveBeenCalledWith(testError);
    });

    test("should call default onError callback when gh-pages fails and no custom callback provided", async () => {
      const consoleSpy = jest.spyOn(console, "log").mockImplementation(() => {});
      const plugin = ghPages();
      
      plugin.configResolved({ build: { outDir: "dist" } });
      
      const testError = new Error("Publishing failed");
      mockPublish.mockImplementation((outDir, options, callback) => {
        callback(testError); // Call error callback
      });

      await plugin.closeBundle();

      expect(consoleSpy).toHaveBeenCalledWith(testError);
      consoleSpy.mockRestore();
    });

    test("should call custom onPublish callback when gh-pages succeeds", async () => {
      const onPublish = jest.fn();
      const plugin = ghPages({ onPublish });
      
      plugin.configResolved({ build: { outDir: "dist" } });
      
      mockPublish.mockImplementation((outDir, options, callback) => {
        callback(); // Call success callback
      });

      await plugin.closeBundle();

      expect(onPublish).toHaveBeenCalledWith({
        dotfiles: true,
        branch: "gh-pages",
        nojekyll: true,
        outDir: "dist",
        onPublish: expect.any(Function)
      });
    });

    test("should call default onPublish callback when gh-pages succeeds and no custom callback provided", async () => {
      const consoleSpy = jest.spyOn(console, "log").mockImplementation(() => {});
      const plugin = ghPages();
      
      plugin.configResolved({ build: { outDir: "dist" } });
      
      mockPublish.mockImplementation((outDir, options, callback) => {
        callback(); // Call success callback
      });

      await plugin.closeBundle();

      expect(consoleSpy).toHaveBeenCalledWith("🎉 Published `dist` to branch `gh-pages`.");
      consoleSpy.mockRestore();
    });

    test("should merge custom options with defaults", async () => {
      const customOptions = {
        branch: "custom-branch",
        message: "Custom commit message",
        user: { name: "Test User", email: "test@example.com" }
      };
      
      const plugin = ghPages(customOptions);
      plugin.configResolved({ build: { outDir: "dist" } });
      
      mockPublish.mockImplementation((outDir, options, callback) => {
        callback(); // Call success callback
      });

      await plugin.closeBundle();

      expect(mockPublish).toHaveBeenCalledWith(
        "dist",
        {
          dotfiles: true,
          branch: "custom-branch", // Should override default
          nojekyll: true,
          message: "Custom commit message",
          user: { name: "Test User", email: "test@example.com" }
        },
        expect.any(Function)
      );
    });

    test("should not call onBeforePublish if not provided", async () => {
      const plugin = ghPages();
      plugin.configResolved({ build: { outDir: "dist" } });
      
      mockPublish.mockImplementation((outDir, options, callback) => {
        callback(); // Call success callback
      });

      // Should not throw error when onBeforePublish is undefined
      await expect(plugin.closeBundle()).resolves.not.toThrow();
    });
  });
});
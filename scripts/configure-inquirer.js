#!/usr/bin/env node

import figlet from "figlet";
import inquirer from "inquirer";
import { writeFileSync, readFileSync, existsSync } from "fs";
import { join, dirname } from "path";
import { fileURLToPath } from "url";
import chalk from "chalk";
import { createSpinner } from "nanospinner";
import process from "process";

// Ensure we're in an interactive terminal
if (!process.stdin.isTTY) {
  console.error(
    chalk.red(
      "This tool requires an interactive terminal. Please run it directly in your terminal."
    )
  );
  process.exit(1);
}

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

// Color definitions - sync with useThemeConfig.js
const THEME_COLORS = {
  blue: "#1976d2",
  purple: "#9c27b0",
  teal: "#009688",
  orange: "#ff9800",
  red: "#f44336",
  green: "#4caf50",
  indigo: "#3f51b5",
  pink: "#e91e63",
  amber: "#ffc107",
  cyan: "#00bcd4",
};

// Configuration file path
const CONFIG_PATH = join(__dirname, "../public/vite-starter.config.json");

/**
 * Display fancy banner using figlet
 */
function displayBanner() {
  console.clear();
  const banner = figlet.textSync("Vite Starter", {
    font: "Standard",
    horizontalLayout: "default",
    verticalLayout: "default",
  });

  console.log(chalk.cyan(banner));
  console.log(chalk.gray("━".repeat(60)));
  console.log(chalk.white.bold("Theme Configuration Tool"));
  console.log(chalk.gray("━".repeat(60)));
  console.log();
}

/**
 * Read current configuration
 */
function getCurrentConfig() {
  try {
    if (existsSync(CONFIG_PATH)) {
      const data = readFileSync(CONFIG_PATH, "utf8");
      return JSON.parse(data);
    }
  } catch {
    console.log(
      chalk.yellow("Warning: Could not read existing config, using defaults")
    );
  }

  return { primaryColor: "blue" };
}

/**
 * Write configuration to file
 */
function writeConfig(config) {
  const configData = {
    ...config,
    updatedAt: new Date().toISOString(),
  };

  try {
    // Write to public directory (accessible to both CLI and React app)
    writeFileSync(CONFIG_PATH, JSON.stringify(configData, null, 2));

    return true;
  } catch (error) {
    console.error(chalk.red("Error writing configuration:"), error.message);
    return false;
  }
}

/**
 * Get color preview for display
 */
function getColorPreview(colorKey) {
  const colorValue = THEME_COLORS[colorKey];
  return chalk.hex(colorValue)("●");
}

/**
 * Enhanced quit experience with animation
 */
async function enhancedQuit() {
  console.clear();

  const spinner = createSpinner("Saving settings...").start();

  // Short pause for effect
  await new Promise((resolve) => setTimeout(resolve, 800));

  spinner.success({ text: chalk.green("Settings saved successfully!") });

  // Another brief pause
  await new Promise((resolve) => setTimeout(resolve, 300));

  console.log();
  console.log(chalk.green("Goodbye! 👋"));
  console.log(chalk.gray("Thanks for using Vite Starter configuration tool."));
  console.log();

  process.exit(0);
}

/**
 * Main CLI application
 */
async function runCLI() {
  displayBanner();

  const currentConfig = getCurrentConfig();

  console.log(
    chalk.gray(
      `Current theme: ${chalk.white(currentConfig.primaryColor)} ${getColorPreview(currentConfig.primaryColor)}`
    )
  );
  console.log();

  try {
    // Main menu
    const { action } = await inquirer.prompt([
      {
        type: "list",
        name: "action",
        message: "What would you like to do?",
        choices: [
          { name: "Change primary color", value: "change-color" },
          { name: "Quit", value: "quit" },
        ],
        default: "change-color",
      },
    ]);

    if (action === "quit") {
      return enhancedQuit();
    }

    // Color selection
    const colorChoices = Object.keys(THEME_COLORS).map((colorKey) => ({
      name: `${colorKey.charAt(0).toUpperCase() + colorKey.slice(1)} ${getColorPreview(colorKey)}`,
      value: colorKey,
      short: colorKey,
    }));

    const { selectedColor } = await inquirer.prompt([
      {
        type: "list",
        name: "selectedColor",
        message: "Select a primary color:",
        choices: [
          ...colorChoices,
          new inquirer.Separator(),
          { name: "Back to main menu", value: "back" },
          { name: "Quit", value: "quit" },
        ],
        pageSize: 13,
      },
    ]);

    if (selectedColor === "back") {
      // Recursively call the main function to return to main menu
      return runCLI();
    }

    if (selectedColor === "quit") {
      return enhancedQuit();
    }

    // Confirmation
    console.log();
    console.log(chalk.gray("Preview:"));
    console.log(
      `Primary color will be set to: ${chalk.white.bold(selectedColor)} ${getColorPreview(selectedColor)}`
    );
    console.log();

    const { confirmed } = await inquirer.prompt([
      {
        type: "confirm",
        name: "confirmed",
        message: "Are you sure you want to apply this configuration?",
        default: true,
      },
    ]);

    if (!confirmed) {
      console.log(chalk.yellow("Configuration not changed."));
      return enhancedQuit();
    }

    // Apply configuration
    const newConfig = { primaryColor: selectedColor };

    if (writeConfig(newConfig)) {
      console.log();
      console.log(chalk.green.bold("✓ Configuration updated successfully!"));
      console.log(
        chalk.gray(
          `Primary color set to: ${selectedColor} ${getColorPreview(selectedColor)}`
        )
      );
      console.log();
      console.log(chalk.cyan("💡 Refresh your browser to see the changes."));
      console.log();

      // Post-application options
      const { nextAction } = await inquirer.prompt([
        {
          type: "list",
          name: "nextAction",
          message: "What would you like to do next?",
          choices: [
            { name: "Return to main menu", value: "main-menu" },
            { name: "Quit", value: "quit" },
          ],
          default: "quit",
        },
      ]);

      if (nextAction === "main-menu") {
        return runCLI();
      } else {
        return enhancedQuit();
      }
    } else {
      console.log(chalk.red("✗ Failed to update configuration."));
      process.exit(1);
    }
  } catch (error) {
    if (error.name === "ExitPromptError") {
      console.log(chalk.yellow("\nOperation cancelled."));
    } else {
      console.error(chalk.red("An error occurred:"), error.message);
    }
    process.exit(1);
  }
}

// Handle graceful exit
process.on("SIGINT", () => {
  console.log(chalk.yellow("\nOperation cancelled."));
  enhancedQuit();
});

// Run the CLI
runCLI();

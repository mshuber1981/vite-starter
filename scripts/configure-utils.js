// Utility functions extracted from configure-inquirer.js for testing
import { writeFileSync, readFileSync, existsSync } from 'fs';
import chalk from 'chalk';

// Color definitions - matches configure-inquirer.js
export const THEME_COLORS = {
  blue: '#1976d2',
  purple: '#9c27b0', 
  teal: '#009688',
  orange: '#ff9800',
  red: '#f44336',
  green: '#4caf50',
  indigo: '#3f51b5',
  pink: '#e91e63',
  amber: '#ffc107',
  cyan: '#00bcd4'
};

/**
 * Read current configuration from file
 */
export function getCurrentConfig(configPath) {
  try {
    if (existsSync(configPath)) {
      const data = readFileSync(configPath, 'utf8');
      return JSON.parse(data);
    }
  } catch {
    console.log(chalk.yellow('Warning: Could not read existing config, using defaults'));
  }
  
  return { primaryColor: 'blue' };
}

/**
 * Write configuration to file
 */
export function writeConfig(configPath, config) {
  const configData = {
    ...config,
    updatedAt: new Date().toISOString()
  };

  try {
    writeFileSync(configPath, JSON.stringify(configData, null, 2));
    return true;
  } catch (error) {
    console.error(chalk.red('Error writing configuration:'), error.message);
    return false;
  }
}

/**
 * Get color preview for display
 */
export function getColorPreview(colorKey) {
  const colorValue = THEME_COLORS[colorKey];
  if (!colorValue) {
    return '?';
  }
  return chalk.hex(colorValue)('●');
}

/**
 * Format color name for display
 */
export function formatColorName(colorKey) {
  return colorKey.charAt(0).toUpperCase() + colorKey.slice(1);
}

/**
 * Validate if a color is supported
 */
export function isValidColor(colorKey) {
  return colorKey in THEME_COLORS;
}

/**
 * Get all available color choices for inquirer
 */
export function getColorChoices() {
  return Object.keys(THEME_COLORS).map(colorKey => ({
    name: `${formatColorName(colorKey)} ${getColorPreview(colorKey)}`,
    value: colorKey,
    short: colorKey
  }));
}
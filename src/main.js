import path from "node:path";

import { loadConfig } from "./config.js";
import { getCurrentPRNumber, getPRBody, updatePRBody } from "./github.js";
import {
  applyUrlReplacements,
  applyPRNumberReplacement,
} from "./replacements.js";
import { parseArgs, showHelp } from "./parse.js";

// Main function
export async function main() {
  try {
    const options = parseArgs(process.argv);

    if (options.help) {
      showHelp();
      return;
    }

    // Load configuration
    const configPath = path.resolve(options.config);
    const config = loadConfig(configPath);

    // Get PR number
    let prNumber = options.number;

    if (!prNumber) {
      prNumber = getCurrentPRNumber();
    }

    if (!prNumber) {
      console.error("No PR number provided and no current PR found");
      process.exit(1);
    }

    console.log(`Processing PR #${prNumber}`);

    // Get current PR body
    const body = getPRBody(prNumber);

    // Apply URL replacements first
    let updatedBody = applyUrlReplacements(body, config);

    // Then apply PR number replacement
    updatedBody = applyPRNumberReplacement(updatedBody, prNumber);

    // Check if body has changed
    if (body !== updatedBody) {
      updatePRBody(prNumber, updatedBody);
    } else {
      console.log("No changes detected in PR body");
    }
  } catch (error) {
    console.error("Error:", error.message);
    process.exit(1);
  }
}

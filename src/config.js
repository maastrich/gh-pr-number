import fs from "node:fs";
import path from "node:path";

// Load configuration
export function loadConfig(configPath) {
  if (!fs.existsSync(configPath)) {
    console.log("No config file found, proceeding without URL replacements");
    return {
      urlReplacements: {},
    };
  }

  try {
    const configContent = fs.readFileSync(configPath, "utf8");
    return JSON.parse(configContent);
  } catch (error) {
    console.error("Error reading config file:", error.message);
    process.exit(1);
  }
}

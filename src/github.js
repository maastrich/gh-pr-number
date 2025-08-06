import { execSync } from "node:child_process";

// Get current PR number
export function getCurrentPRNumber() {
  const output = execSync('gh pr view --json number --jq ".number"', {
    encoding: "utf8",
  });
  return output.trim();
}

// Get PR body
export function getPRBody(prNumber) {
  try {
    const output = execSync(`gh pr view ${prNumber} --json body --jq ".body"`, {
      encoding: "utf8",
    });
    return output.trim();
  } catch (error) {
    console.error("Error getting PR body:", error.message);
    process.exit(1);
  }
}

// Update PR body
export function updatePRBody(prNumber, newBody) {
  try {
    // Escape the body for shell command
    const escapedBody = newBody.replace(/'/g, "'\"'\"'");
    execSync(`gh pr edit ${prNumber} --body '${escapedBody}'`, {
      stdio: "inherit",
    });
    console.log(`Updated PR #${prNumber} body`);
  } catch (error) {
    console.error("Error updating PR body:", error.message);
    process.exit(1);
  }
}

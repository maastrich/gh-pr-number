// Apply URL replacements
export function applyUrlReplacements(body, config) {
  let updatedBody = body;

  if (config.urlReplacements) {
    for (const [from, to] of Object.entries(config.urlReplacements)) {
      updatedBody = updatedBody.replace(
        new RegExp(escapeRegExp(from), "g"),
        to
      );
    }
  }

  return updatedBody;
}

// Apply PR number replacement
export function applyPRNumberReplacement(body, prNumber) {
  return body.replace(/\${prNumber}/g, prNumber);
}

// Escape special regex characters
function escapeRegExp(string) {
  return string.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
}

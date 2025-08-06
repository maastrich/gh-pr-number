#!/usr/bin/env node

import { main } from "./src/main.js";

// Run the script
if (import.meta.url === `file://${process.argv[1]}`) {
  main().catch((error) => {
    console.error("Error:", error.message);
    process.exit(1);
  });
}

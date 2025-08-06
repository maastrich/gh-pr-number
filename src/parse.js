// Parse command line arguments
export function parseArgs(argv) {
  const args = {
    config: "magics.config.json",
    number: null,
    help: false,
  };

  // Skip the first two arguments (node path and script path)
  const options = argv.slice(2);

  for (let i = 0; i < options.length; i++) {
    const arg = options[i];

    if (arg === "--help" || arg === "-h") {
      args.help = true;
    } else if (arg === "--config" || arg === "-c") {
      if (i + 1 < options.length) {
        args.config = options[i + 1];
        i++; // Skip the next argument as it's the value
      } else {
        throw new Error("--config requires a value");
      }
    } else if (arg === "--number" || arg === "-n") {
      if (i + 1 < options.length) {
        args.number = options[i + 1];
        i++; // Skip the next argument as it's the value
      } else {
        throw new Error("--number requires a value");
      }
    } else if (arg === "--") {
      break;
    } else if (arg.startsWith("--")) {
      throw new Error(`Unknown option: ${arg}`);
    } else if (arg.startsWith("-") && arg.length > 1) {
      throw new Error(`Unknown option: ${arg}`);
    }
  }

  return args;
}

// Display help information
export function showHelp() {
  console.log(`
Usage: gh-pr-number [options]

Options:
  -c, --config <path>    Path to config file (default: "magics.config.json")
  -n, --number <number>  PR number to process
  -h, --help             display help for command
`);
}

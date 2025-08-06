# gh-pr-number

A Go tool for automatically replacing `${prNumber}` placeholders in GitHub PR descriptions with the actual PR number, plus configurable URL replacements.

## Project Structure

```
gh-pr-number/
├── cmd/
│   └── root.go         # Command line interface using Cobra
├── internal/
│   ├── config/         # Configuration loading
│   ├── github/         # GitHub CLI interactions
│   └── replacements/   # Text replacement functions
├── main.go             # Entry point
├── go.mod              # Go module definition
├── magics.config.json  # Configuration file
└── README.md
```

## Features

- Automatically detects current PR number if none provided
- Replaces `${prNumber}` placeholders with actual PR number
- Configurable URL replacements that run before PR number replacement
- JSON-based configuration system
- Command-line interface with options using Cobra

## Installation

1. Clone this repository
2. Build the binary:
   ```bash
   go build -o gh-pr-number
   ```

## Usage

### Basic Usage

Process the current PR:

```bash
./gh-pr-number
```

Process a specific PR:

```bash
./gh-pr-number --number 123
```

### Configuration

Create a `magics.config.json` file in your project root to configure URL replacements:

```json
{
  "urlReplacements": {
    "http://localhost:3112": "https://pr-${prNumber}.lcm.live.mobsuccess.com",
    "http://localhost:3000": "https://pr-${prNumber}.dev.example.com"
  }
}
```

The URL replacements are applied **before** the `${prNumber}` replacement, so you can use `${prNumber}` in your replacement URLs. If no config file is found, the script will proceed without URL replacements.

### Command Line Options

- `-n, --number <number>`: Specify a PR number to process
- `-c, --config <path>`: Path to config file (default: `magics.config.json`)

## How It Works

1. **Get PR Number**: If no number is provided, it detects the current PR number
2. **Load Configuration**: Reads `config.json` for URL replacement rules
3. **Get PR Body**: Fetches the current PR description
4. **Apply URL Replacements**: Replaces configured URLs (runs first)
5. **Apply PR Number Replacement**: Replaces `${prNumber}` with actual number
6. **Update PR**: Only updates if changes were made

## Example

If your PR body contains:

```
Check out the preview at http://localhost:3112
PR number: ${prNumber}
```

And your `magics.config.json` has:

```json
{
  "urlReplacements": {
    "http://localhost:3112": "https://pr-${prNumber}.lcm.live.mobsuccess.com"
  }
}
```

For PR #123, it will become:

```
Check out the preview at https://pr-123.lcm.live.mobsuccess.com
PR number: 123
```

## Requirements

- Go 1.21 or later
- GitHub CLI (`gh`) installed and authenticated
- Git repository with GitHub remote

## Migration from Node.js Version

The original Node.js script has been migrated to Go with enhanced features:

- ✅ Same core functionality
- ✅ Configurable URL replacements
- ✅ Better error handling
- ✅ Command-line options using Cobra
- ✅ JSON configuration system
- ✅ Single binary distribution
- ✅ Better performance

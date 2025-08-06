.PHONY: build clean install test

# Build the binary
build:
	go build -o gh-pr-number

# Clean build artifacts
clean:
	rm -f gh-pr-number

# Install to system (requires sudo)
install: build
	sudo cp gh-pr-number /usr/local/bin/

# Run tests
test:
	go test ./...

# Build for multiple platforms
build-all: clean
	GOOS=linux GOARCH=amd64 go build -o gh-pr-number-linux-amd64
	GOOS=darwin GOARCH=amd64 go build -o gh-pr-number-darwin-amd64
	GOOS=darwin GOARCH=arm64 go build -o gh-pr-number-darwin-arm64
	GOOS=windows GOARCH=amd64 go build -o gh-pr-number-windows-amd64.exe

# Default target
all: build 
package github

import (
	"fmt"
	"os/exec"
	"strings"
)

// GetCurrentPRNumber gets the current PR number using GitHub CLI
func GetCurrentPRNumber() (string, error) {
	cmd := exec.Command("gh", "pr", "view", "--json", "number", "--jq", ".number")
	output, err := cmd.Output()
	if err != nil {
		return "", fmt.Errorf("failed to get current PR number: %w", err)
	}
	return strings.TrimSpace(string(output)), nil
}

// GetPRBody gets the PR body for the specified PR number
func GetPRBody(prNumber string) (string, error) {
	cmd := exec.Command("gh", "pr", "view", prNumber, "--json", "body", "--jq", ".body")
	output, err := cmd.Output()
	if err != nil {
		return "", fmt.Errorf("failed to get PR body: %w", err)
	}
	return strings.TrimSpace(string(output)), nil
}

// UpdatePRBody updates the PR body for the specified PR number
func UpdatePRBody(prNumber, newBody string) error {
	cmd := exec.Command("gh", "pr", "edit", prNumber, "--body", newBody)
	cmd.Stdout = nil
	cmd.Stderr = nil

	if err := cmd.Run(); err != nil {
		return fmt.Errorf("failed to update PR body: %w", err)
	}

	fmt.Printf("Updated PR #%s body\n", prNumber)
	return nil
}

package cmd

import (
	"fmt"

	"github.com/maastrich/gh-pr-number/internal/config"
	"github.com/maastrich/gh-pr-number/internal/github"
	"github.com/maastrich/gh-pr-number/internal/replacements"
	"github.com/spf13/cobra"
)

var (
	configPath string
	prNumber   string
)

// rootCmd represents the base command when called without any subcommands
var rootCmd = &cobra.Command{
	Use:   "gh-pr-number",
	Short: "GitHub PR number replacement tool with configurable URL replacements",
	Long: `A tool for automatically replacing ${prNumber} placeholders in GitHub PR descriptions 
with the actual PR number, plus configurable URL replacements.`,
	RunE: run,
}

// Execute adds all child commands to the root command and sets flags appropriately.
func Execute() error {
	return rootCmd.Execute()
}

func init() {
	rootCmd.Flags().StringVarP(&configPath, "config", "c", "magics.config.json", "Path to config file")
	rootCmd.Flags().StringVarP(&prNumber, "number", "n", "", "PR number to process")
}

func run(cmd *cobra.Command, args []string) error {
	// Load configuration
	cfg, err := config.LoadConfig(configPath)
	if err != nil {
		return fmt.Errorf("failed to load config: %w", err)
	}

	// Get PR number
	if prNumber == "" {
		prNumber, err = github.GetCurrentPRNumber()
		if err != nil {
			return fmt.Errorf("failed to get current PR number: %w", err)
		}
	}

	if prNumber == "" {
		return fmt.Errorf("no PR number provided and no current PR found")
	}

	fmt.Printf("Processing PR #%s\n", prNumber)

	// Get current PR body
	body, err := github.GetPRBody(prNumber)
	if err != nil {
		return fmt.Errorf("failed to get PR body: %w", err)
	}

	// Apply URL replacements first
	updatedBody := replacements.ApplyURLReplacements("http://localhost:3000/toto", cfg, prNumber)

	// Then apply PR number replacement
	updatedBody = replacements.ApplyPRNumberReplacement(updatedBody, prNumber)

	// Check if body has changed
	if body != updatedBody {
		if err := github.UpdatePRBody(prNumber, updatedBody); err != nil {
			return fmt.Errorf("failed to update PR body: %w", err)
		}
	} else {
		fmt.Println("No changes detected in PR body")
	}

	return nil
}

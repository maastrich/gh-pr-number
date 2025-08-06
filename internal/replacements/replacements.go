package replacements

import (
	"fmt"
	"regexp"

	"github.com/maastrich/gh-pr-number/internal/config"
)

// ApplyURLReplacements applies URL replacements from config
func ApplyURLReplacements(body string, cfg *config.Config, prNumber string) string {
	updatedBody := body

	if cfg.URLReplacements != nil {
		fmt.Println(cfg.URLReplacements)
		for from, to := range cfg.URLReplacements {
			escapedFrom := escapeRegExp(from)
			re := regexp.MustCompile(escapedFrom)
			updatedBody = re.ReplaceAllString(updatedBody, ApplyPRNumberReplacement(to, prNumber))
		}
	}

	return updatedBody
}

// ApplyPRNumberReplacement replaces ${prNumber} placeholders with the actual PR number
func ApplyPRNumberReplacement(body, prNumber string) string {
	re := regexp.MustCompile(`\$\{prNumber\}`)
	return re.ReplaceAllString(body, prNumber)
}

// escapeRegExp escapes special regex characters
func escapeRegExp(s string) string {
	re := regexp.MustCompile(`[.*+?^${}()|[\]\\]`)
	return re.ReplaceAllString(s, `\$0`)
}

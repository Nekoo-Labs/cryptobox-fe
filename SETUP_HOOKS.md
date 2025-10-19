# Git Hooks Setup Guide

This project uses Husky and lint-staged to ensure code quality before commits and pushes.

## Quick Setup

Run these commands in order:

```bash
# 1. Install dependencies
npm install

# 2. Initialize Husky and create hooks
npm run prepare
```

## What Gets Checked

### Pre-commit (on `git commit`)

Runs quickly on only staged files:

- **📝 Lint-staged**: Runs ESLint and Prettier on staged files
  - Automatically fixes linting issues
  - Formats code according to Prettier rules
  - Only checks files you're committing (fast!)

**Output**: Verbose feedback showing which files are being processed

### Pre-push (on `git push`)

Runs comprehensive checks on entire codebase in 3 steps:

- **🔍 Step 1/3 - Type Check**: Validates TypeScript types across the project
- **🔍 Step 2/3 - Lint**: Runs ESLint on entire codebase
- **🔍 Step 3/3 - Build**: Ensures the project builds successfully

**Output**: Detailed step-by-step progress with clear success/failure messages

⚠️ **Note**: Pre-push can take 30-60 seconds as it builds the entire project

## Manual Commands

You can run these checks manually anytime:

```bash
# Format all files
npm run format

# Check formatting without changing files
npm run format:check

# Run ESLint
npm run lint

# Type-check
npm run type-check
```

## Skipping Hooks (Emergency Only)

If you absolutely need to skip hooks:

```bash
# Skip pre-commit
git commit --no-verify

# Skip pre-push
git push --no-verify
```

**Note**: Only use `--no-verify` in emergencies. The hooks are there to help!

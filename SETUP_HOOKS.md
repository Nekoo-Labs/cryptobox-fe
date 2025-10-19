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

- **ESLint**: Automatically fixes linting issues on staged files
- **Prettier**: Formats staged files
- Only runs on files you're committing (fast!)

### Pre-push (on `git push`)

- **TypeScript**: Type-checks entire codebase
- **ESLint**: Lints entire codebase
- Ensures no type errors or lint issues make it to remote

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

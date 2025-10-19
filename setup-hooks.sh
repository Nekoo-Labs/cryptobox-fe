#!/bin/bash

# Initialize Husky
npx husky init

# Create pre-commit hook
cat > .husky/pre-commit << 'EOF'
npx lint-staged
EOF

# Create pre-push hook
cat > .husky/pre-push << 'EOF'
npm run type-check
npm run lint
EOF

echo "✅ Git hooks setup complete!"
echo "Pre-commit: Runs lint-staged (ESLint + Prettier on staged files)"
echo "Pre-push: Runs type-check and lint on entire codebase"

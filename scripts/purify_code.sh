#!/bin/bash
echo "❖ PURIFYING CODE STRUCTURE..."

# Remove trailing whitespace from all tracked files
git ls-files | xargs sed -i 's/[ \t]*$//'

# Ensure one newline at end of file
git ls-files | xargs -I {} bash -c 'tail -c1 "{}" | read -r _ || echo >> "{}"'

echo "✅ CODE PURIFIED."

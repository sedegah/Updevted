#!/bin/bash

START_DATE="2025-03-28"
END_DATE="2025-06-29"
MESSAGES=(
  "Implement GitHub trending repos integration"
  "Fix PostgreSQL connection issue in dev"
  "Enhance AI assistant response quality"
  "Improve responsive layout on mobile"
  "Refactor roadmap component structure"
  "Optimize Tailwind utility classes"
  "Setup Render deployment blueprint"
  "Add fade-in animations for content tiles"
  "Update README with local dev steps"
  "Add unit tests for roadmap component"
  "Refine dark mode contrast ratios"
  "Integrate Groq API for summarization"
  "Design bookmark system state flow"
  "Enhance error handling for API fetches"
  "Add TypeScript types to components"
  "Improve loading spinner UX"
  "Test offline support with service workers"
  "Add custom 404 page"
  "Refactor fetch logic for tech news"
  "Improve GitHub trending repo UI"
)

CURRENT_DATE="$START_DATE"
while [[ "$CURRENT_DATE" < "$END_DATE" || "$CURRENT_DATE" == "$END_DATE" ]]; do
  COMMITS=$((6 + RANDOM % 7))
  echo "Creating $COMMITS commits for $CURRENT_DATE"
  for ((i = 0; i < COMMITS; i++)); do
    MESSAGE=${MESSAGES[$RANDOM % ${#MESSAGES[@]}]}
    echo "$CURRENT_DATE $MESSAGE" >> commit.log
    echo "// $MESSAGE" >> dummy.js
    git add .
    GIT_AUTHOR_DATE="$CURRENT_DATE 10:$((RANDOM % 60)):00" \
    GIT_COMMITTER_DATE="$CURRENT_DATE 10:$((RANDOM % 60)):00" \
    git commit -m "$MESSAGE" > /dev/null
  done
  CURRENT_DATE=$(date -I -d "$CURRENT_DATE + 1 day")
done

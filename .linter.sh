#!/bin/bash
cd /home/kavia/workspace/code-generation/campusattend-94593-9fab8889/attendance_backend
npm run lint
LINT_EXIT_CODE=$?
if [ $LINT_EXIT_CODE -ne 0 ]; then
  exit 1
fi


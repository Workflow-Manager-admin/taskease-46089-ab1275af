#!/bin/bash
cd /home/kavia/workspace/code-generation/taskease-46089-ab1275af/taskease
npm run build
EXIT_CODE=$?
if [ $EXIT_CODE -ne 0 ]; then
   exit 1
fi


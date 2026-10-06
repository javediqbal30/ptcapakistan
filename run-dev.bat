@echo off
rem Launch the Astro dev server in the FOREGROUND with the env preload.
rem The server keeps running until you press Ctrl+C (it does NOT auto-stop).
cd /d %~dp0
node -r scripts\preload-env.mjs node_modules\astro\astro.js dev
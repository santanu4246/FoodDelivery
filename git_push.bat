@echo off
cd /d "%~dp0"

git add .

git commit -m "Food delivery"

git push -u origin main

pause

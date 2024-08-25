@echo off
cd /d "%~dp0"

git add .

git commit -m "Working on backend..."

git push -u origin main
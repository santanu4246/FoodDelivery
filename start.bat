@echo off
REM Navigate to the frontend folder and check if node_modules exists

cd client
if exist node_modules (
    echo node_modules found in frontend. Skipping npm install.
    start cmd /k "npm run dev"
) else (
    echo node_modules not found in frontend. Running npm install.
    start cmd /k "npm install && npm run dev"
)
cd ..

REM Navigate to the backend folder and check if node_modules exists

cd server
if exist node_modules (
    echo node_modules found in backend. Skipping npm install.
    start cmd /k "npm run dev"
) else (
    echo node_modules not found in backend. Running npm install.
    start cmd /k "npm install && npm run dev"
)
cd ..

REM Open the browser on port 5173

start "" "http://localhost:5173"
@echo off
echo ========================================
echo Starting WISER Volunteer Platform
echo ========================================
echo.

REM Start Backend Server in a new window
echo [1/2] Starting Backend Server on port 3001...
start "WISER Backend" cmd /k "npm run server"

REM Wait a bit for backend to start
timeout /t 3 /nobreak > nul

REM Start Frontend Dev Server in a new window
echo [2/2] Starting Frontend Dev Server on port 5173...
start "WISER Frontend" cmd /k "npm run dev"

echo.
echo ========================================
echo Both servers are starting...
echo Backend: http://localhost:3001
echo Frontend: http://localhost:5173
echo ========================================
echo.
echo Press any key to exit this window...
pause > nul

@echo off
cls
color 0A
echo ========================================
echo    WISER VOLUNTEER PROJECT STARTUP
echo ========================================
echo.

echo 🛑 Stopping any existing Node.js processes...
taskkill /f /im node.exe /t >nul 2>&1
timeout /t 2 /nobreak >nul

echo 🔄 Killing any processes using ports 3001 and 5173...
for /f "tokens=5" %%a in ('netstat -aon ^| findstr :3001') do taskkill /f /pid %%a >nul 2>&1
for /f "tokens=5" %%a in ('netstat -aon ^| findstr :5173') do taskkill /f /pid %%a >nul 2>&1
for /f "tokens=5" %%a in ('netstat -aon ^| findstr :5174') do taskkill /f /pid %%a >nul 2>&1
timeout /t 2 /nobreak >nul

echo.
echo 🚀 Starting Backend Server (Port 3001)...
start "WISER Backend Server" cmd /c "cd /d %CD% && npm run server"

echo 🔄 Waiting for backend to initialize...
timeout /t 5 /nobreak >nul

echo 🌐 Starting Frontend Server (Port 5173)...
start "WISER Frontend Server" cmd /c "cd /d %CD% && npx vite --port 5173"

echo.
echo ⏳ Waiting for servers to be ready...
timeout /t 10 /nobreak >nul

echo.
echo ✅ Servers should be running now!
echo.
echo 📝 Access your website at: http://localhost:5173
echo 📊 Backend API at: http://localhost:3001
echo.
echo 💡 To stop: Close both server windows or run STOP_PROJECT.bat
echo 💡 To restart: Run this script again
echo.
echo 🔄 Testing connection...
echo.

:: Test backend health
curl -s http://localhost:3001/api/health >nul 2>&1
if %errorlevel% equ 0 (
  echo ✅ Backend server is responding
) else (
  echo ⚠️  Backend server might still be starting, please wait...
)

:: Test frontend
curl -s http://localhost:5173 >nul 2>&1
if %errorlevel% equ 0 (
  echo ✅ Frontend server is responding
) else (
  echo ⚠️  Frontend server might still be starting, please wait...
)

echo.
echo 🚀 Startup process completed!
pause
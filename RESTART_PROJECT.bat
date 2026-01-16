@echo off
cls
color 0E
echo ========================================
echo    WISER VOLUNTEER PROJECT RESTART
echo ========================================
echo.

echo 🔄 Stopping all servers...
taskkill /f /im node.exe /t >nul 2>&1
timeout /t 3 /nobreak >nul

echo.
echo 🚀 Starting Backend Server (Port 3001)...
start "WISER Backend" cmd /c "npm run server"

echo 🔄 Waiting for backend to initialize...
timeout /t 5 /nobreak >nul

echo 🌐 Starting Frontend Server (Port 5173)...
start "WISER Frontend" cmd /c "npm run dev"

echo.
echo ⏳ Waiting for servers to be ready...
timeout /t 8 /nobreak >nul

echo.
echo ✅ Servers restarted successfully!
echo.
echo 📝 Access your website at: http://localhost:5173
echo 📊 Backend API at: http://localhost:3001
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
echo 🚀 Restart process completed!
pause
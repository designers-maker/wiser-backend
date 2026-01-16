@echo off
cls
color 0C
echo ========================================
echo    WISER VOLUNTEER PROJECT SHUTDOWN
echo ========================================
echo.

echo 🛑 Stopping all Node.js processes...
taskkill /f /im node.exe /t >nul 2>&1

echo.
echo ✅ All servers stopped successfully!
echo.
echo 💡 You can now safely close this window
echo 💡 To restart: Run START_PROJECT.bat
pause
@echo off
cls
color 0C
echo ========================================
echo    Stopping WISER Volunteer Project
echo ========================================
echo.

echo 🛑 Stopping all Node.js processes...
taskkill /f /im node.exe /t >nul 2>&1

echo ✅ All servers stopped successfully!
echo.
echo 💡 You can now close this window
pause
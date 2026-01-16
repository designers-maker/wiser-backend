@echo off
echo ========================================
echo MongoDB Atlas DNS Fix Script
echo ========================================
echo.

echo Setting Google DNS (8.8.8.8)...
netsh interface ip set dns "Wi-Fi" static 8.8.8.8
if %errorlevel% neq 0 (
    echo Trying Ethernet connection...
    netsh interface ip set dns "Ethernet" static 8.8.8.8
)

echo Adding secondary DNS (8.8.4.4)...
netsh interface ip add dns "Wi-Fi" 8.8.4.4 index=2
if %errorlevel% neq 0 (
    netsh interface ip add dns "Ethernet" 8.8.4.4 index=2
)

echo Flushing DNS cache...
ipconfig /flushdns

echo Renewing IP address...
ipconfig /renew

echo.
echo ========================================
echo DNS Fix Complete!
echo Please restart your computer and then:
echo 1. Run: npm run server
echo 2. Test form submission
echo ========================================
echo.
pause

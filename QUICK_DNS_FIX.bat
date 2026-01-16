@echo off
echo ========================================
echo Quick DNS Fix for MongoDB Atlas
echo ========================================
echo.

echo Testing current DNS resolution...
nslookup cluster0.gw6blyc.mongodb.net
echo.

echo Setting Google Public DNS...
echo Primary DNS: 8.8.8.8
echo Secondary DNS: 8.8.4.4
echo.

echo Please manually set DNS in Windows Settings:
echo 1. Press Windows + I (Settings)
echo 2. Network & Internet ^> Wi-Fi ^> Your Network
echo 3. Edit DNS server assignment
echo 4. Set to: 8.8.8.8 and 8.8.4.4
echo.
echo Then run: ipconfig /flushdns
echo.
pause

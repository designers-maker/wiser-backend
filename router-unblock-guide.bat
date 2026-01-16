@echo off
cls
color 0A
echo ========================================
echo    ROUTER MONGODB ATLAS UNBLOCK GUIDE
echo ========================================
echo.
echo 🔧 Steps to unblock MongoDB Atlas on your router:
echo.

echo STEP 1: Access Your Router Admin Panel
echo ======================================
echo 1. Open browser and go to one of these:
echo    http://192.168.0.1
echo    http://192.168.1.1  
echo    http://10.0.0.1
echo    http://admin.routerlogin.com
echo.
echo 2. Common login credentials to try:
echo    admin/admin
echo    admin/password
echo    admin/[leave password blank]
echo    Check router sticker for default credentials
echo.

echo STEP 2: Find Security/Firewall Settings
echo =======================================
echo Look for these menu options:
echo • Security
echo • Firewall
echo • Parental Controls
echo • Application Control
echo • Traffic Filter
echo • Access Control
echo • Port Filtering
echo.

echo STEP 3: Disable or Configure MongoDB Access
echo ============================================
echo Option A - Disable Filtering (Easiest):
echo    • Turn OFF "Application Control"
echo    • Turn OFF "Parental Controls" 
echo    • Turn OFF "Traffic Filter"
echo.
echo Option B - Add Exception (More Secure):
echo    • Add exception for domain: *.mongodb.net
echo    • Allow port: 27017 (TCP)
echo    • Allow port: 27016 (TCP) - backup
echo.

echo STEP 4: Save and Restart
echo =======================
echo 1. Save all changes
echo 2. Restart your router
echo 3. Wait 2-3 minutes for restart
echo.

echo STEP 5: Test Connection
echo ======================
echo After router restart, run:
echo    node test-your-atlas.js
echo.

echo TROUBLESHOOTING:
echo ================
echo If still blocked, try:
echo 1. Factory reset router (last resort)
echo 2. Upgrade router firmware
echo 3. Contact ISP about database blocking
echo 4. Use VPN workaround
echo.

echo Press any key when ready to test connection...
pause >nul
cd /d "c:\Users\Madan A\Desktop\wiser-volunteer-full"
node test-your-atlas.js
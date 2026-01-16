@echo off
cls
color 0E
echo ========================================
echo    NETWORK BLOCKING IDENTIFICATION
echo ========================================
echo.
echo 🔍 Analyzing what's blocking MongoDB Atlas...
echo.

echo 1. Testing basic internet connectivity...
ping -n 1 8.8.8.8 >nul
if %errorlevel% equ 0 (
    echo ✅ Internet connection: WORKING
) else (
    echo ❌ Internet connection: FAILED
)
echo.

echo 2. Testing DNS resolution capability...
nslookup google.com >nul 2>&1
if %errorlevel% equ 0 (
    echo ✅ DNS resolution: WORKING
) else (
    echo ❌ DNS resolution: FAILED
)
echo.

echo 3. Testing MongoDB Atlas domain resolution...
nslookup cluster0.gw6blyc.mongodb.net 8.8.8.8 >nul 2>&1
if %errorlevel% equ 0 (
    echo ✅ Atlas DNS resolution: WORKING
) else (
    echo ❌ Atlas DNS resolution: BLOCKED
)
echo.

echo 4. Testing different DNS servers...
echo    Testing Google DNS (8.8.8.8)...
nslookup cluster0.gw6blyc.mongodb.net 8.8.8.8 | findstr "Addresses" >nul
if %errorlevel% equ 0 (echo    ✅ Google DNS: Resolves) else (echo    ❌ Google DNS: Blocked)

echo    Testing Cloudflare DNS (1.1.1.1)...
nslookup cluster0.gw6blyc.mongodb.net 1.1.1.1 | findstr "Addresses" >nul
if %errorlevel% equ 0 (echo    ✅ Cloudflare DNS: Resolves) else (echo    ❌ Cloudflare DNS: Blocked)

echo    Testing OpenDNS (208.67.222.222)...
nslookup cluster0.gw6blyc.mongodb.net 208.67.222.222 | findstr "Addresses" >nul
if %errorlevel% equ 0 (echo    ✅ OpenDNS: Resolves) else (echo    ❌ OpenDNS: Blocked)
echo.

echo 5. Testing direct IP connectivity...
echo    Getting Atlas server IPs...
for /f "tokens=2" %%a in ('nslookup cluster0-shard-00-00.gw6blyc.mongodb.net 8.8.8.8 ^| findstr "Address" ^| findstr "[0-9]"') do (
    set atlas_ip=%%a
    goto :test_ip
)
:test_ip
if defined atlas_ip (
    echo    Found Atlas IP: %atlas_ip%
    echo    Testing connectivity to %atlas_ip%:27017...
    telnet %atlas_ip% 27017 2>nul
    if %errorlevel% equ 0 (
        echo    ✅ Direct IP connection: WORKING
    ) else (
        echo    ❌ Direct IP connection: BLOCKED
    )
) else (
    echo    ⚠️  Could not resolve Atlas IP addresses
)
echo.

echo 6. Checking Windows Firewall status...
netsh advfirewall show allprofiles state | findstr "State" 
echo.

echo 7. Testing with firewall temporarily disabled...
echo    ⚠️  This will temporarily disable Windows Firewall
echo    ⚠️  Press Ctrl+C to cancel, or any key to proceed
pause >nul

echo    Disabling firewall temporarily...
netsh advfirewall set allprofiles state off >nul 2>&1

echo    Testing Atlas connection with firewall OFF...
node test-your-atlas.js > temp_result.txt 2>&1
findstr "SUCCESS" temp_result.txt >nul
if %errorlevel% equ 0 (
    echo    ✅ CONNECTION WORKS with firewall DISABLED
    echo    🔧 ISSUE: Windows Firewall is blocking MongoDB connections
) else (
    echo    ❌ Still FAILS even with firewall disabled
    echo    🔧 ISSUE: Router/ISP level blocking
)

echo    Re-enabling firewall...
netsh advfirewall set allprofiles state on >nul 2>&1
del temp_result.txt >nul 2>&1
echo.

echo ========================================
echo    BLOCKING SOURCE IDENTIFIED:
echo ========================================
echo.
echo If DNS resolution failed: ROUTER DNS FILTERING
echo If direct IP failed: ISP NETWORK BLOCKING  
echo If firewall test worked: WINDOWS FIREWALL
echo If all failed: ROUTER HARDWARE FIREWALL
echo.

echo Press any key to exit...
pause >nul
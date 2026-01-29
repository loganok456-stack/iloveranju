@echo off
echo ╔═══════════════════════════════════════════╗
echo ║   💖 Valentine's Website Setup 💖        ║
echo ╚═══════════════════════════════════════════╝
echo.

REM Check if Node.js is installed
where node >nul 2>nul
if %ERRORLEVEL% NEQ 0 (
    echo ❌ Node.js is not installed!
    echo Please install Node.js from https://nodejs.org/
    pause
    exit /b 1
)

node --version
echo.

REM Install dependencies
echo 📦 Installing dependencies...
call npm install

if %ERRORLEVEL% EQU 0 (
    echo.
    echo ✅ Dependencies installed successfully!
    echo.
    echo ╔═══════════════════════════════════════════╗
    echo ║          Setup Complete! 🎉               ║
    echo ╠═══════════════════════════════════════════╣
    echo ║                                           ║
    echo ║  To start the server, run:                ║
    echo ║                                           ║
    echo ║      npm start                            ║
    echo ║                                           ║
    echo ║  Then open your browser to:               ║
    echo ║      http://localhost:3000                ║
    echo ║                                           ║
    echo ╚═══════════════════════════════════════════╝
    echo.
    
    set /p REPLY="Would you like to start the server now? (y/n) "
    if /i "%REPLY%"=="y" (
        echo.
        echo 🚀 Starting server...
        call npm start
    )
) else (
    echo.
    echo ❌ Installation failed! Please check the errors above.
    pause
    exit /b 1
)

pause

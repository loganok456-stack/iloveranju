#!/bin/bash

echo "╔═══════════════════════════════════════════╗"
echo "║   💖 Valentine's Website Setup 💖        ║"
echo "╚═══════════════════════════════════════════╝"
echo ""

# Check if Node.js is installed
if ! command -v node &> /dev/null; then
    echo "❌ Node.js is not installed!"
    echo "Please install Node.js from https://nodejs.org/"
    exit 1
fi

echo "✅ Node.js version: $(node --version)"
echo ""

# Install dependencies
echo "📦 Installing dependencies..."
npm install

if [ $? -eq 0 ]; then
    echo ""
    echo "✅ Dependencies installed successfully!"
    echo ""
    echo "╔═══════════════════════════════════════════╗"
    echo "║          Setup Complete! 🎉               ║"
    echo "╠═══════════════════════════════════════════╣"
    echo "║                                           ║"
    echo "║  To start the server, run:                ║"
    echo "║                                           ║"
    echo "║      npm start                            ║"
    echo "║                                           ║"
    echo "║  Then open your browser to:               ║"
    echo "║      http://localhost:3000                ║"
    echo "║                                           ║"
    echo "╚═══════════════════════════════════════════╝"
    echo ""
    
    # Ask if user wants to start the server now
    read -p "Would you like to start the server now? (y/n) " -n 1 -r
    echo ""
    if [[ $REPLY =~ ^[Yy]$ ]]; then
        echo ""
        echo "🚀 Starting server..."
        npm start
    fi
else
    echo ""
    echo "❌ Installation failed! Please check the errors above."
    exit 1
fi

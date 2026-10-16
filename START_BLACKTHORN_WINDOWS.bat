@echo off
setlocal EnableExtensions
cd /d "%~dp0"
title Blackthorn Academy - Local Game Server

where py >nul 2>nul
if %errorlevel%==0 (
  py -3 "%~dp0start_blackthorn_windows.py"
) else (
  where python >nul 2>nul
  if %errorlevel%==0 (
    python "%~dp0start_blackthorn_windows.py"
  ) else (
    echo.
    echo Python 3 was not found on this Windows computer.
    echo Install Python 3.10 or later and select "Add Python to PATH".
    echo Then double-click this file again.
    echo.
  )
)
echo.
echo The Blackthorn launcher has stopped.
pause
endlocal

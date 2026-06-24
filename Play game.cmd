@echo off
rem ============================================================
rem  One-click launcher for Stigespillet (web).
rem  Double-click THIS file to open the game in your browser.
rem  (Use this if double-clicking index.html doesn't work.)
rem ============================================================
setlocal
set "CHROME=C:\Program Files\Google\Chrome\Application\chrome.exe"
set "CHROME86=C:\Program Files (x86)\Google\Chrome\Application\chrome.exe"
set "EDGE=C:\Program Files (x86)\Microsoft\Edge\Application\msedge.exe"

if exist "%CHROME%" (
  start "" "%CHROME%" "%~dp0index.html"
) else if exist "%CHROME86%" (
  start "" "%CHROME86%" "%~dp0index.html"
) else if exist "%EDGE%" (
  start "" "%EDGE%" "%~dp0index.html"
) else (
  rem fall back to whatever the system has registered for .html
  start "" "%~dp0index.html"
)

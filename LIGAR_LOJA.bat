@echo off
title Servidor NemonicRP - ATIVO
echo ====================================================
echo    SERVIDOR DA LOJA NEMONICRP ATIVO!
echo ====================================================
echo.
echo 1. DEIXE ESTA JANELA ABERTA.
echo 2. ABRA ESTE LINK NO SEU NAVEGADOR:
echo.
echo    http://localhost:3000
echo.
echo ====================================================
powershell -ExecutionPolicy Bypass -File .\servidor_windows.ps1
pause
12s
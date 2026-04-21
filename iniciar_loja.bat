@echo off
echo ==========================================
echo   Iniciando Servidor NemonicRP Store
echo ==========================================
echo Tentando rodar via Node.js (npx serve)...
npx serve -l 3000 .
if %ERRORLEVEL% NEQ 0 (
    echo.
    echo NPX nao encontrado. Tentando via Python...
    python -m http.server 3000
)
if %ERRORLEVEL% NEQ 0 (
    echo.
    echo Erro: Nao encontramos Node.js ou Python no seu computador.
    echo Por favor, instale o Node.js em: https://nodejs.org/
    pause
)
pause

@echo off
echo ========================================
echo   Arrêt de tous les serveurs Python
echo ========================================
echo.

taskkill /F /IM python.exe /T 2>nul

if %ERRORLEVEL% == 0 (
    echo ✅ Tous les serveurs Python ont été arrêtés.
) else (
    echo ℹ️ Aucun serveur Python en cours d'exécution.
)

echo.
echo Vous pouvez maintenant redémarrer le serveur avec demarrer-serveur.bat
echo.
pause



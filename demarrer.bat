@echo off
echo ========================================
echo   Demarrage du serveur local
echo   Site: Cite de l'amour
echo ========================================
echo.

REM Vérifier si Python est installé
python --version >nul 2>&1
if %errorlevel% == 0 (
    echo [OK] Python detecte
    echo.
    echo Demarrage du serveur sur http://localhost:8000
    echo Appuyez sur Ctrl+C pour arreter le serveur
    echo.
    python -m http.server 8000
    goto :end
)

REM Vérifier si PHP est installé
php --version >nul 2>&1
if %errorlevel% == 0 (
    echo [OK] PHP detecte
    echo.
    echo Demarrage du serveur sur http://localhost:8000
    echo Appuyez sur Ctrl+C pour arreter le serveur
    echo.
    php -S localhost:8000
    goto :end
)

REM Si ni Python ni PHP ne sont installés
echo [ERREUR] Aucun serveur web local detecte
echo.
echo Veuillez installer l'un des suivants:
echo   - Python 3: https://www.python.org/downloads/
echo   - PHP: https://www.php.net/downloads.php
echo   - Node.js: https://nodejs.org/
echo.
echo OU ouvrez simplement index.html dans votre navigateur
echo (certaines fonctionnalites peuvent ne pas fonctionner)
echo.
pause

:end



@echo off
chcp 65001 >nul
echo ========================================
echo   Serveur local pour Cité de l'Amour
echo   (Version avec vérifications)
echo ========================================
echo.

REM Aller dans le dossier du script
cd /d "%~dp0"
echo Répertoire actuel: %CD%
echo.

REM Vérifier que nous sommes dans le bon dossier
if exist "data\departments.json" (
    set JSON_PATH=data\departments.json
    echo ✅ Fichier trouvé dans data\departments.json
) else if exist "departments.json" (
    set JSON_PATH=departments.json
    echo ✅ Fichier trouvé à la racine: departments.json
) else (
    echo ❌ ERREUR: Le fichier departments.json n'existe pas !
    echo.
    echo Vous n'êtes pas dans le bon répertoire.
    echo Le serveur doit être démarré depuis le dossier cite-amour
    echo Répertoire actuel: %CD%
    echo.
    pause
    exit /b 1
)

if not exist "admin\index.html" (
    echo ❌ ERREUR: Le fichier admin\index.html n'existe pas !
    echo.
    echo Vous n'êtes pas dans le bon répertoire.
    echo.
    pause
    exit /b 1
)

echo ✅ Vérifications OK !
echo    - Fichier %JSON_PATH% trouvé
echo    - Fichier admin\index.html trouvé
echo.
echo ========================================
echo   Démarrage du serveur...
echo ========================================
echo.
echo Le serveur sera accessible sur:
echo   http://localhost:8000/
echo   http://localhost:8000/admin/
echo   http://localhost:8000/data/departments.json
echo.
echo Appuyez sur Ctrl+C pour arrêter le serveur
echo.
echo ========================================
echo.

python -m http.server 8000

pause




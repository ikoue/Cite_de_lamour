@echo off
echo ========================================
echo   Serveur local pour Cité de l'Amour
echo ========================================
echo.
echo Démarrage du serveur sur http://localhost:8000
echo.
echo Appuyez sur Ctrl+C pour arrêter le serveur
echo.
echo ========================================
echo.

cd /d "%~dp0"
echo Répertoire actuel:
cd
echo.
echo Vérification des fichiers JSON...
if exist "data\departments.json" (
    echo ✅ Fichier data\departments.json trouvé !
) else if exist "departments.json" (
    echo ✅ Fichier departments.json trouvé à la racine !
) else (
    echo ❌ Fichier departments.json non trouvé ! Vérifiez que vous êtes dans le bon répertoire.
    pause
    exit
)
echo.
echo Démarrage du serveur...
python -m http.server 8000

pause


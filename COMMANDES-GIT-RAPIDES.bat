@echo off
echo ========================================
echo   GUIDE RAPIDE GIT - Cite de l'Amour
echo ========================================
echo.

:menu
echo.
echo Choisissez une action :
echo.
echo 1. Voir l'etat des fichiers (git status)
echo 2. Ajouter tous les fichiers modifies (git add .)
echo 3. Faire un commit
echo 4. Pousser vers GitHub (git push)
echo 5. Recuperer les modifications (git pull)
echo 6. Voir l'historique (git log)
echo 7. Initialiser Git (premiere fois)
echo 8. Quitter
echo.
set /p choice="Votre choix (1-8): "

if "%choice%"=="1" goto status
if "%choice%"=="2" goto add
if "%choice%"=="3" goto commit
if "%choice%"=="4" goto push
if "%choice%"=="5" goto pull
if "%choice%"=="6" goto log
if "%choice%"=="7" goto init
if "%choice%"=="8" goto end

echo Choix invalide!
goto menu

:status
echo.
echo === ETAT DES FICHIERS ===
git status
pause
goto menu

:add
echo.
echo === AJOUT DES FICHIERS ===
git add .
echo Fichiers ajoutes!
pause
goto menu

:commit
echo.
echo === COMMIT ===
set /p message="Message du commit: "
git commit -m "%message%"
echo Commit effectue!
pause
goto menu

:push
echo.
echo === PUSH VERS GITHUB ===
git push
pause
goto menu

:pull
echo.
echo === PULL DEPUIS GITHUB ===
git pull
pause
goto menu

:log
echo.
echo === HISTORIQUE (5 derniers commits) ===
git log --oneline -5
pause
goto menu

:init
echo.
echo === INITIALISATION GIT ===
echo ATTENTION: Cette action est pour la premiere fois seulement!
echo.
set /p confirm="Etes-vous sur? (oui/non): "
if not "%confirm%"=="oui" goto menu
git init
echo.
echo Git initialise!
echo.
echo Maintenant, connectez-vous a GitHub:
echo git remote add origin https://github.com/VOTRE-USERNAME/VOTRE-REPO.git
pause
goto menu

:end
echo.
echo Au revoir!
pause
exit


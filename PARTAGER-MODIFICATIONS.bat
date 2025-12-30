@echo off
echo ========================================
echo   PARTAGER MES MODIFICATIONS
echo ========================================
echo.

echo Cette operation va:
echo 1. Ajouter tous vos fichiers modifies
echo 2. Creer un commit
echo 3. Pousser vers GitHub
echo.

set /p message="Message du commit (description de vos modifications): "

if "%message%"=="" (
    echo ERREUR: Vous devez entrer un message!
    pause
    exit
)

echo.
echo === Ajout des fichiers ===
git add .
echo Fichiers ajoutes!

echo.
echo === Creation du commit ===
git commit -m "%message%"
if errorlevel 1 (
    echo.
    echo ERREUR: Aucun fichier a commiter ou erreur lors du commit
    echo Verifiez avec: git status
    pause
    exit
)

echo.
echo === Push vers GitHub ===
git push

if errorlevel 1 (
    echo.
    echo ERREUR lors du push.
    echo Essayez: git pull d'abord pour recuperer les modifications
) else (
    echo.
    echo ========================================
    echo   SUCCES!
    echo ========================================
    echo.
    echo Vos modifications ont ete partagees sur GitHub!
)

pause


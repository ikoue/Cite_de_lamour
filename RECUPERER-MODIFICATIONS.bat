@echo off
echo ========================================
echo   RECUPERER LES MODIFICATIONS
echo ========================================
echo.

echo Cette operation va recuperer les modifications de l'equipe depuis GitHub.
echo.

echo === Verification de l'etat local ===
git status

echo.
echo ATTENTION: Si vous avez des modifications non commitées, elles pourraient entrer en conflit.
echo.
set /p confirm="Continuer? (oui/non): "
if not "%confirm%"=="oui" (
    echo Operation annulee.
    pause
    exit
)

echo.
echo === Recuperation depuis GitHub ===
git pull

if errorlevel 1 (
    echo.
    echo ========================================
    echo   CONFLIT DETECTE
    echo ========================================
    echo.
    echo Il y a des conflits entre vos modifications et celles de l'equipe.
    echo.
    echo Options:
    echo 1. Sauvegarder vos modifications: git stash
    echo 2. Commit vos modifications d'abord: git add . puis git commit
    echo 3. Resoudre les conflits manuellement dans les fichiers
    echo.
    echo Fichiers en conflit:
    git status
) else (
    echo.
    echo ========================================
    echo   SUCCES!
    echo ========================================
    echo.
    echo Les modifications ont ete recuperees!
)

pause


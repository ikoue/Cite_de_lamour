@echo off
echo ========================================
echo   INITIALISATION GIT - Cite de l'Amour
echo ========================================
echo.

echo Cette operation va initialiser Git dans ce projet.
echo.
set /p confirm="Continuer? (oui/non): "
if not "%confirm%"=="oui" (
    echo Operation annulee.
    pause
    exit
)

echo.
echo === Etape 1: Initialisation de Git ===
git init
if errorlevel 1 (
    echo ERREUR: Git n'est pas installe ou n'est pas dans le PATH
    echo Installez Git depuis https://git-scm.com/download/win
    pause
    exit
)

echo.
echo === Etape 2: Configuration Git ===
echo.
set /p username="Votre nom (pour Git): "
set /p useremail="Votre email (pour Git): "

git config user.name "%username%"
git config user.email "%useremail%"

echo.
echo === Etape 3: Ajout des fichiers ===
git add .
echo Fichiers ajoutes!

echo.
echo === Etape 4: Premier commit ===
git commit -m "Initial commit - Site Cite de l'Amour avec tous les departements"
echo Commit effectue!

echo.
echo ========================================
echo   ETAPES SUIVANTES
echo ========================================
echo.
echo 1. Allez sur https://github.com
echo 2. Creez un nouveau depot (New repository)
echo 3. Donnez-lui un nom (ex: cite-amour)
echo 4. NE cochez PAS "Initialize with README"
echo 5. Copiez l'URL du depot
echo 6. Executez ces commandes:
echo.
echo    git remote add origin https://github.com/VOTRE-USERNAME/VOTRE-REPO.git
echo    git branch -M main
echo    git push -u origin main
echo.
echo OU utilisez le script CONNECTER-GITHUB.bat
echo.
pause


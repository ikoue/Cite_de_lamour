@echo off
echo ========================================
echo   CONNEXION A GITHUB
echo ========================================
echo.

echo Cette operation va connecter votre depot local a GitHub.
echo.
echo IMPORTANT: Vous devez avoir cree le depot sur GitHub d'abord!
echo.
set /p confirm="Avez-vous cree le depot sur GitHub? (oui/non): "
if not "%confirm%"=="oui" (
    echo.
    echo 1. Allez sur https://github.com
    echo 2. Cliquez sur "New repository"
    echo 3. Donnez un nom au depot
    echo 4. NE cochez PAS "Initialize with README"
    echo 5. Cliquez sur "Create repository"
    echo 6. Revenez ici et relancez ce script
    pause
    exit
)

echo.
echo Collez l'URL de votre depot GitHub
echo Exemple: https://github.com/username/cite-amour.git
echo.
set /p repo_url="URL du depot GitHub: "

echo.
echo === Connexion au depot distant ===
git remote add origin %repo_url%
if errorlevel 1 (
    echo.
    echo Le depot distant existe deja. Voulez-vous le remplacer?
    set /p replace="(oui/non): "
    if "%replace%"=="oui" (
        git remote set-url origin %repo_url%
        echo Depot distant mis a jour!
    ) else (
        echo Operation annulee.
        pause
        exit
    )
) else (
    echo Depot distant ajoute!
)

echo.
echo === Renommage de la branche en 'main' ===
git branch -M main

echo.
echo === Push vers GitHub ===
echo.
echo ATTENTION: Vous devrez peut-etre vous authentifier.
echo Si on vous demande vos identifiants:
echo - Username: votre nom d'utilisateur GitHub
echo - Password: utilisez un Personal Access Token (pas votre mot de passe)
echo.
echo Pour creer un token: https://github.com/settings/tokens
echo.
pause

git push -u origin main

if errorlevel 1 (
    echo.
    echo ERREUR lors du push.
    echo Verifiez:
    echo 1. Que l'URL du depot est correcte
    echo 2. Que vous avez les droits d'acces
    echo 3. Que vous etes connecte a Internet
) else (
    echo.
    echo ========================================
    echo   SUCCES!
    echo ========================================
    echo.
    echo Votre code a ete pousse vers GitHub!
    echo Vous pouvez maintenant partager le depot avec votre equipe.
)

pause


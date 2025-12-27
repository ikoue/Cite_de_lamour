# Script PowerShell pour démarrer le serveur local
# Site: Cité de l'amour

Write-Host "========================================" -ForegroundColor Cyan
Write-Host "  Démarrage du serveur local" -ForegroundColor Cyan
Write-Host "  Site: Cité de l'amour" -ForegroundColor Cyan
Write-Host "========================================" -ForegroundColor Cyan
Write-Host ""

# Vérifier Python
try {
    $pythonVersion = python --version 2>&1
    if ($LASTEXITCODE -eq 0) {
        Write-Host "[OK] Python détecté: $pythonVersion" -ForegroundColor Green
        Write-Host ""
        Write-Host "Démarrage du serveur sur http://localhost:8000" -ForegroundColor Yellow
        Write-Host "Appuyez sur Ctrl+C pour arrêter le serveur" -ForegroundColor Yellow
        Write-Host ""
        python -m http.server 8000
        exit
    }
} catch {
    # Python non trouvé
}

# Vérifier PHP
try {
    $phpVersion = php --version 2>&1
    if ($LASTEXITCODE -eq 0) {
        Write-Host "[OK] PHP détecté" -ForegroundColor Green
        Write-Host ""
        Write-Host "Démarrage du serveur sur http://localhost:8000" -ForegroundColor Yellow
        Write-Host "Appuyez sur Ctrl+C pour arrêter le serveur" -ForegroundColor Yellow
        Write-Host ""
        php -S localhost:8000
        exit
    }
} catch {
    # PHP non trouvé
}

# Aucun serveur trouvé
Write-Host "[ERREUR] Aucun serveur web local détecté" -ForegroundColor Red
Write-Host ""
Write-Host "Veuillez installer l'un des suivants:" -ForegroundColor Yellow
Write-Host "  - Python 3: https://www.python.org/downloads/"
Write-Host "  - PHP: https://www.php.net/downloads.php"
Write-Host "  - Node.js: https://nodejs.org/"
Write-Host ""
Write-Host "OU ouvrez simplement index.html dans votre navigateur" -ForegroundColor Yellow
Write-Host "(certaines fonctionnalités peuvent ne pas fonctionner)"
Write-Host ""
Read-Host "Appuyez sur Entrée pour quitter"



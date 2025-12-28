# Script PowerShell pour démarrer le serveur local
Write-Host "========================================" -ForegroundColor Cyan
Write-Host "  Serveur local pour Cité de l'Amour" -ForegroundColor Cyan
Write-Host "========================================" -ForegroundColor Cyan
Write-Host ""
Write-Host "Démarrage du serveur sur http://localhost:8000" -ForegroundColor Green
Write-Host ""
Write-Host "Appuyez sur Ctrl+C pour arrêter le serveur" -ForegroundColor Yellow
Write-Host ""
Write-Host "========================================" -ForegroundColor Cyan
Write-Host ""

# Aller dans le dossier du script
Set-Location $PSScriptRoot

# Démarrer le serveur Python
python -m http.server 8000




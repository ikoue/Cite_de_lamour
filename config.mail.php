<?php
/**
 * Configuration SMTP pour l'envoi d'emails
 * 
 * IMPORTANT: Remplacez les valeurs ci-dessous par vos propres identifiants SMTP
 * Pour Gmail, vous devez utiliser un "Mot de passe d'application" et non votre mot de passe habituel
 * 
 * Comment obtenir un mot de passe d'application Gmail:
 * 1. Allez sur https://myaccount.google.com/apppasswords
 * 2. Sélectionnez "Mail" et "Autre (nom personnalisé)"
 * 3. Entrez "Cité de l'amour" comme nom
 * 4. Copiez le mot de passe généré (16 caractères)
 */

return [
    // Adresse email SMTP (Gmail)
    'smtp_user' => 'citedelamour@gmail.com',
    
    // Mot de passe d'application Gmail (16 caractères)
    // ⚠️ REMPLACEZ PAR VOTRE VRAI MOT DE PASSE D'APPLICATION
    'smtp_pass' => '1Viedimpact@men.',
    
    // Email de destination (où recevoir les demandes)
    'to_email' => 'citedelamour@gmail.com',
    
    // Nom de l'expéditeur
    'from_name' => "Cité de l'amour - Départements",
];


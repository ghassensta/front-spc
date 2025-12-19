import { readFileSync, writeFileSync, readdirSync } from 'fs';
import { dirname, join, relative, extname } from 'path';
import { fileURLToPath } from 'url';

// Obtenir le chemin du répertoire actuel
const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

// Dossier racine du projet
const rootDir = join(__dirname, 'src');

// Expressions régulières pour détecter les différents types de console
const consolePatterns = [
  /\s*console\.log\([^)]*\);?/g,
  /\s*console\.error\([^)]*\);?/g,
  /\s*console\.warn\([^)]*\);?/g,
  /\s*console\.debug\([^)]*\);?/g,
  /\s*\/\/\s*console\.log\([^)]*\);?/g,  // Pour les logs commentés
  /\/\*[\s\S]*?\*\//g  // Pour les blocs de commentaires
];

// Fonction pour nettoyer un fichier
function cleanFile(filePath) {
  try {
    let content = readFileSync(filePath, 'utf8');
    let originalContent = content;
    
    // Supprimer les commentaires de débogage
    content = content.replace(/\/\*\s*DEBUG[\s\S]*?\*\//g, '');
    content = content.replace(/\/\/\s*DEBUG.*$/gm, '');
    
    // Supprimer toutes les occurrences de console.*
    consolePatterns.forEach(pattern => {
      content = content.replace(pattern, '');
    });
    
    // Supprimer les lignes vides multiples
    content = content.replace(/\n{3,}/g, '\n\n');
    
    // Si le contenu a changé, écrire le fichier
    if (content !== originalContent) {
      writeFileSync(filePath, content.trim() + '\n', 'utf8');
      console.log(`Nettoyé: ${relative(process.cwd(), filePath)}`);
      return true;
    }
    return false;
  } catch (error) {
    console.error(`Erreur lors du traitement de ${filePath}:`, error.message);
    return false;
  }
}

// Fonction pour parcourir récursivement les dossiers
function processDirectory(directory) {
  let cleanedCount = 0;
  
  try {
    const items = readdirSync(directory, { withFileTypes: true });
    
    for (const item of items) {
      const fullPath = join(directory, item.name);
      
      if (item.isDirectory()) {
        // Ignorer les dossiers spécifiques
        if (['node_modules', '.git', '.next', 'build', 'dist', 'cache'].includes(item.name)) continue;
        cleanedCount += processDirectory(fullPath);
      } else if (
        item.isFile() && 
        ['.js', '.jsx', '.ts', '.tsx'].includes(extname(item.name).toLowerCase())
      ) {
        if (cleanFile(fullPath)) {
          cleanedCount++;
        }
      }
    }
  } catch (error) {
    console.error(`Erreur lors de la lecture du dossier ${directory}:`, error.message);
  }
  
  return cleanedCount;
}

// Démarrer le processus de nettoyage
console.log('Début du nettoyage des instructions de débogage...');
const totalCleaned = processDirectory(rootDir);
console.log(`\nNettoyage terminé ! ${totalCleaned} fichiers ont été nettoyés.`);

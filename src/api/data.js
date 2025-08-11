 const API_URL = "http://127.0.0.1:8000/api";
export const API_URL_base = "http://127.0.0.1:8000/";

/**
 * Récupère la liste des catégories depuis l'API Laravel
 * @returns {Promise<Array>} Liste des catégories
 */
export async function fetchCategories() {
  try {
    const response = await fetch(`${API_URL}/categories`);
    if (!response.ok) {
      throw new Error("Erreur lors du chargement des catégories");
    }
    const data = await response.json();
    console.log("fetchCategories response:", data);
    return data.categories || data;
  } catch (error) {
    console.error("fetchCategories error:", error);
    throw error;
  }
}

/**
 * Récupère la liste des Etablissements depuis l'API Laravel
 * @returns {Promise<Array>} Liste des Etablissements
 */
export async function fetchEtablissements() {
  try {
    const response = await fetch(`${API_URL}/etablissements`);
    if (!response.ok) {
      throw new Error("Erreur lors du chargement des établissements");
    }
    const data = await response.json();
    console.log("fetchEtablissements response:", data);
    return data.etablissements || data;
  } catch (error) {
    console.error("fetchEtablissements error:", error);
    throw error;
  }
}

/**
 * Récupère la liste des Actualite depuis l'API Laravel
 * @returns {Promise<Array>} Liste des Actualite
 */

export async function fetchActualites() {
  try {
    const response = await fetch(`${API_URL}/actualites`);
    if (!response.ok) {
      throw new Error("Erreur lors du chargement des actualités");
    }
    const data = await response.json();
    console.log("fetchActualites response:", data);
    return data.actualites || data;
  } catch (error) {
    console.error("fetchActualites error:", error);
    throw error;
  }
}

/**
 * Récupère la liste des marque-partenaire depuis l'API Laravel
 * @returns {Promise<Array>} Liste des marque-partenaire
 */

export async function fetchMarquePartenaire() {
  try {
    const response = await fetch(`${API_URL}/marques-partenaires`);
    if (!response.ok) {
      throw new Error("Erreur lors du chargement des marques partenaires");
    }
    const data = await response.json();
    console.log("fetchMarquePartenaire response:", data);
    return data.marquesPartenaire || data;
  } catch (error) {
    console.error("fetchMarquePartenaire error:", error);
    throw error;
  }
}

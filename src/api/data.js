const API_URL = "http://127.0.0.1:8000/api";

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


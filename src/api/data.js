const API_URL = "http://127.0.0.1:8000/api";
export const API_URL_base = "http://127.0.0.1:8000";

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

/**
 * Récupère la liste des éléments de menu depuis l'API Laravel
 * @returns {Promise<Array>} Liste des éléments de menu
 */
export async function fetchMenuSidebar() {
  try {
    const response = await fetch(`${API_URL}/menu-sidebar`);

    if (!response.ok) {
      throw new Error(
        `Erreur lors du chargement des menus : ${response.status} ${response.statusText}`
      );
    }

    const data = await response.json();
    console.log("fetchMenuSidebar response:", data);

    return data.data ?? [];
  } catch (error) {
    console.error("fetchMenuSidebar error:", error);
    throw error;
  }
}
/**
 * Récupère la liste des éléments de menu depuis l'API Laravel
 * @returns {Promise<Array>} Liste des éléments de menu
 */
export async function fetchMenuFooter() {
  try {
    const response = await fetch(`${API_URL}/menu-footer`);

    if (!response.ok) {
      throw new Error(
        `Erreur lors du chargement des menus : ${response.status} ${response.statusText}`
      );
    }

    const data = await response.json();
    console.log("fetchMenuFooter response:", data);

    if (!data.success) {
      console.error("Erreur API:", data.message);
      return { footer_about: [], footer_pro: [], social_links: [] };
    }

    // Retourne les données ou un tableau vide si absent
    return {
      settings: data.data.settings ?? [],
      footer_about: data.data.footer_about ?? [],
      footer_pro: data.data.footer_pro ?? [],
      social_links: data.data.social_links ?? [],
    };
  } catch (error) {
    console.error("fetchMenuFooter error:", error);
    return { settings: [], footer_about: [], footer_pro: [], social_links: [] };
  }
}

/**
 * Récupère la section Carte depuis l'API Laravel
 * @returns {Promise<Object|null>} Section carte ou null
 */
export async function fetchSectionCarte() {
  try {
    const response = await fetch(`${API_URL}/section-carte`);

    if (!response.ok) {
      throw new Error(
        `Erreur lors du chargement de la section carte : ${response.status} ${response.statusText}`
      );
    }

    const data = await response.json();
    console.log("fetchSectionCarte response:", data);

    if (!data.success) {
      console.error("Erreur API:", data.message);
      return null;
    }

    return data.data ?? null;
  } catch (error) {
    console.error("fetchSectionCarte error:", error);
    return null;
  }
}

// src/api/data.js
export async function fetchProchainementDisponible() {
  try {
    const response = await fetch(`${API_URL}/section-prochainement-disponible`);
    if (!response.ok) {
      throw new Error("Erreur lors du chargement des éléments");
    }
    const data = await response.json();
    console.log("fetchProchainementDisponible response:", data);
    // Retourner directement la section principale
    return data.data;
  } catch (error) {
    console.error("fetchProchainementDisponible error:", error);
    throw error;
  }
}


export async function GetUser() {
  try {
    const token = localStorage.getItem("token");
    if (!token) throw new Error("No token found");
    const response = await fetch(`${API_URL}/auth/me`, {
      headers: { Authorization: `Bearer ${token}` },
    });
    if (!response.ok) {
      throw new Error("Erreur lors du chargement de l'utilisateur");
    }

    const data = await response.json();
    console.log("GetUser response:", data);
    return data.user || null;
  }catch (error) {
    console.error("GetUser error:", error);
    throw error;
  }

}
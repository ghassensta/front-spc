import { useEffect, useState } from "react";
import { fetchCategories } from "../api/data";

export function useCategories() {
  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const data = fetchCategories();
  setCategories(data);
  return { categories, loading, error };
}

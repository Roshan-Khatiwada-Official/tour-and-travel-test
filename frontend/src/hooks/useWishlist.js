import { useCallback, useEffect, useState } from "react";

const STORAGE_KEY = "ca_wishlist";

function readStored() {
  try {
    return JSON.parse(localStorage.getItem(STORAGE_KEY)) || [];
  } catch {
    return [];
  }
}

// No backend model for this — it's a lightweight, no-account-required nice-
// to-have, so localStorage is the right amount of persistence for it.
export function useWishlist() {
  const [ids, setIds] = useState(readStored);

  useEffect(() => {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(ids));
  }, [ids]);

  const has = useCallback((id) => ids.includes(id), [ids]);
  const toggle = useCallback((id) => {
    setIds((prev) => (prev.includes(id) ? prev.filter((x) => x !== id) : [...prev, id]));
  }, []);

  return { ids, has, toggle };
}

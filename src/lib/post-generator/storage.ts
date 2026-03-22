import type { SavedPost } from "./types";

const STORAGE_KEY = "jm-post-generator-saved";

export function getSavedPosts(): SavedPost[] {
  if (typeof window === "undefined") return [];
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    return raw ? JSON.parse(raw) : [];
  } catch {
    return [];
  }
}

export function savePost(post: SavedPost): SavedPost[] {
  const existing = getSavedPosts();
  const updated = [post, ...existing];
  localStorage.setItem(STORAGE_KEY, JSON.stringify(updated));
  return updated;
}

export function deletePost(id: string): SavedPost[] {
  const existing = getSavedPosts();
  const updated = existing.filter((p) => p.id !== id);
  localStorage.setItem(STORAGE_KEY, JSON.stringify(updated));
  return updated;
}

export function generateId(): string {
  return `post-${Date.now()}-${Math.random().toString(36).slice(2, 8)}`;
}

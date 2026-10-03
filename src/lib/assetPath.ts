/**
 * Prepends the basePath for static assets on GitHub Pages.
 * Usage: asset("/media/photos/memory-01.jpg")
 */
export function asset(path: string): string {
  const base = process.env.NEXT_PUBLIC_BASE_PATH ?? "";
  return `${base}${path}`;
}

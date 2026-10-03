/**
 * Prepends the basePath for static assets on GitHub Pages.
 * Usage: asset("/media/photos/memory-01.jpg")
 * Safe against double-prepending and undefined inputs.
 */
export function asset(path?: string): string {
  if (!path) return "";
  if (
    path.startsWith("http://") ||
    path.startsWith("https://") ||
    path.startsWith("data:") ||
    path.startsWith("blob:")
  ) {
    return path;
  }
  const base = process.env.NEXT_PUBLIC_BASE_PATH ?? "";
  if (base && path.startsWith(base)) {
    return path;
  }
  const cleanPath = path.startsWith("/") ? path : `/${path}`;
  return `${base}${cleanPath}`;
}

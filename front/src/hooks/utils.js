export const getImageUrl = (fullPath) => {
  return new URL(fullPath, import.meta.url).href;
}

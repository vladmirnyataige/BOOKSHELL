export const getImageUrl = (img, IMG_BASE) => {
  if (!img) return "/placeholder.png";
  return img.startsWith("http") ? img : `${IMG_BASE}${img}`;
};

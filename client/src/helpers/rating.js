export const getRatingClass = (rating) => {
  return rating < 6 ? "low-rating" : "high-rating";
};

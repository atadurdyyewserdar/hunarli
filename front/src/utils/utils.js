export const multlipleSearchParams = (current, appendValue) => {
  if (current.length === 0 || current === "all") return appendValue;
  else return current + "," + appendValue;
};

export const removeSearchParam = (current, removeValue) => {
  if (current.split(",").length === 1) return "all";
  current = current + ",";
  current = current.replace(removeValue + ",", "");
  return current.slice(0, current.length - 1);
};

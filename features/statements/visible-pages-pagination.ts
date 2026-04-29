export const visiblePages = (page: number, totalPages: number) => {
  const maxVisible = 5;
  let start = Math.max(page, 1);
  let end = start + maxVisible - 1;
  const pages = [];

  if (end > totalPages) {
    end = totalPages;
    start = Math.max(end - maxVisible + 1, 1);
  }

  for (let i = start; i <= end; i++) {
    pages.push(i);
  }

  return pages;
};

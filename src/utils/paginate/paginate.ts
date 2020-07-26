export const paginate = <T>(
  collection: T[],
  itemsPerPage: number,
  pageIndex = 0
) => {
  const totalItems = collection.length;
  const totalPages = Math.ceil(totalItems / itemsPerPage);
  const pages = [...new Array(totalPages)].map((_, pageIndex) => {
    return collection.slice(
      pageIndex * itemsPerPage,
      (pageIndex + 1) * itemsPerPage
    );
  });

  return {
    itemsPerPage,
    totalItems,
    totalPages,
    pages,
    pageItems: pages[pageIndex] || [],
    pageIndex,
    previousPageIndex: pageIndex === 0 ? null : pageIndex - 1,
    nextPageIndex: pageIndex + 2 > totalPages ? null : pageIndex + 1
  };
};

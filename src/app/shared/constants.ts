export const Constants = {
    BASE_URL: 'https://api.github.com/users',
    ITEMS_PER_PAGE: 10,
    NEXT_PAGE_PATTERN: /(?<=<)([\S]*)(?=>; rel="next")/i,
  };
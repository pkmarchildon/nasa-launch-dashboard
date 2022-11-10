// By setting the number of documents to 0, it tells Mongo to return all of them.
const DEFAULT_PAGE_LIMIT = 0;
const DEFAULT_PAGE_NUMBER = 1;

function getPagination(query) {
  // We use Math.abs() to ensure we have a positive number and will convert the String to a Number.
  // The || is a short hand for if the first expression is UNDEFINED or NULL, then the other value.
  const limit = Math.abs(query.limit) || DEFAULT_PAGE_LIMIT;
  const page = Math.abs(query.page) || DEFAULT_PAGE_NUMBER;
  const skip = limit * (page - 1);

  return { skip, limit };
}

module.exports = { getPagination };

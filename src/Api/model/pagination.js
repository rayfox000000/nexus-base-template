function generatePagination(offset, limit, count) {
    return {
        itemsShownFrom: count === 0 ? 0 : (offset + 1),
        itemsShownTo: Math.min(limit + offset, count),
        totalItem: count
    }
}

module.exports = generatePagination
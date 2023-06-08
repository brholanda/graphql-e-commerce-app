exports.Category = {
    products: ({ id: categoryId }, { filter }, { db, filterProducts }) => {
        let filteredProducts = db.products.filter(product => product.categoryId === categoryId);
        return filterProducts(filter, filteredProducts);
    },
}
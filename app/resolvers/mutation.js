const { v4: uuid } = require("uuid")

exports.Mutation = {
    addCategory: (parent, { input }, { db }) => {
        const newCategory = {
            id: uuid(),
            ...input
        }
        db.categories.push(newCategory);
        return newCategory;
    },
    addProduct: (parent, { input }, { db }) => {
        const newProduct = {
            id: uuid(),
            ...input
        }
        db.products.push(newProduct);
        return newProduct;
    },
    addReview: (parent, { input }, { db }) => {
        const newReview = {
            id: uuid(),
            ...input
        }
        db.reviews.push(newReview);
        return newReview;
    },
    deleteCategory: (parent, { id }, { db }) => {
        const originalLength = db.categories.length;
        db.categories = db.categories.filter(category => category.id !== id);
        db.products.forEach(product => {
            if(product.categoryId === id) {
                product.categoryId = null;
            }
        })
        return originalLength !== db.categories.length;
    },
    deleteProduct: (parent, { id }, { db }) => {
        const originalLength = db.products.length;
        db.products = db.products.filter(product => product.id !== id);
        db.reviews = db.reviews.filter(review => review.productId !== id);
        return originalLength !== db.products.length;
    },
    deleteReview: (parent, { id }, { db }) => {
        const originalLength = db.reviews.length;
        db.reviews = db.reviews.filter(category => category.id !== id);
        return originalLength !== db.reviews.length;
    },
    updateCategory: (parent, { id, input }, { db, updateEntity }) => {
        return updateEntity(id, input, db.categories);
    },
    updateProduct: (parent, { id, input }, { db, updateEntity }) => {
        return updateEntity(id, input, db.products);
    },
    updateReview: (parent, { id, input }, { db, updateEntity }) => {
        return updateEntity(id, input, db.reviews);
    },
}
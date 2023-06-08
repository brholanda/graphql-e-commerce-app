const { db } = require("../data");

filterProducts = (filter, products) => {
    let filteredProducts = products
    if (filter) {
        filteredProducts = filterByOnSale(filter, filteredProducts);
        filteredProducts = filterByAvgRating(filter, filteredProducts);
    }
    return filteredProducts
}

filterByOnSale = ({ onSale }, products) => {
    if (typeof onSale !== "undefined") {
        products = products.filter(product => product.onSale == onSale);
    }
    return products;
}

filterByAvgRating = ({ avgRating }, products) => {
    if (avgRating) {
        products = products.filter(product => {
            let sumRating = 0;
            let numReviews = 0;
            db.reviews.forEach(review => {
                if (review.productId === product.id) {
                    sumRating += review.rating;
                    numReviews++;
                }
            })
            const avg = sumRating / numReviews;
            return avg >= avgRating;
        })
    }
    return products;
}

exports.ProductFunctions = {
    filterProducts,
}
const { ApolloServer } = require("apollo-server");
const { typeDefs } = require("./schema");
const { Category } = require("./resolvers/category");
const { Mutation } = require("./resolvers/mutation");
const { Product } = require("./resolvers/product");
const { Query } = require("./resolvers/query");
const { GeneralFunctions } = require("./functions/general")
const { ProductFunctions } = require("./functions/productFunctions")
const { db } = require("./data");

const server = new ApolloServer({
	typeDefs,
	resolvers: {
		Category,
		Mutation,
		Product,
		Query,
	},
	context: {
		db,
		...ProductFunctions,
		...GeneralFunctions,
	}
});

server.listen().then(({ url }) => {
	console.log("Server is ready at " + url)
})
require("dotenv").config({ path: "./src/config/.env" });
require("./src/database/db")();
const express = require("express");
const { ApolloServer } = require("apollo-server-express");
const schema = require("./src/graphql/schema/index");
const resolvers = require("./src/graphql/resolvers/index");
const cors = require("cors");
const cookieParser = require('cookie-parser')

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cors());
app.use(cookieParser())

const serverStart = async () => {
  const server = new ApolloServer({
    typeDefs: schema,
    resolvers,
  });
  await server.start();
  server.applyMiddleware({ app, path: "/graphql" });
};

serverStart();

const port = process.env.PORT || 7000;
const host = process.env.HOST || "localhost";

app.listen(port, () => {
  console.log(`Server is running on http://${host}:${port}`);
});

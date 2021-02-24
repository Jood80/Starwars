
const { GraphQLServer } = require('graphql-yoga');
require('dotenv').config();

const fetch = require('node-fetch');

const typeDefs = `
type Query {
  hello(name: String): String!
  getPerson(id: Int!): Person
 }

type Planet {
  name: String
  rotation_period: String
  orbital_period: String
  films : [Film]

}

type Film {
  title: String
  director: String
	producer: String
	release_date: String
}

type Person {
  name: String
  mass: String
  height: String
  gender: String
  films : [Film]
  homeworld: Planet
}
`;


const resolveFilms= (parent) => {
      const promises = parent.films.map(async (url) => {
        const response = await fetch(url);
        return response.json();
      });
      return Promise.all(promises);
    } 

const resolvers = {
  Planet: {
    films: resolveFilms
  },  
  Person: {
    homeworld: async (parent) => {
      const response = await fetch(parent.homeworld);
      return response.json();
    },
    films: resolveFilms
  },
  Query: {
    hello: (_, { name }) => `Hello ${name || 'World'}`,
    getPerson: async (_, { id }) => {
      const response = await fetch(`http://swapi.dev/api/people/${id}/`);
      return response.json();
    },
  },
};

const options = {
  port: process.env.PORT || 4000,
  endpoint: '/graphql',
  subscriptions: '/subscriptions',
  playground: '/playground',
};

const server = new GraphQLServer({ typeDefs, resolvers });

server.start(options, ({ port }) =>
  console.log(
    `Server started, listening on port ${port} for incoming requests.`,
  ),
);

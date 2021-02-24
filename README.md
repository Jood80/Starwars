# Starwars
Fetching external data at node env using Graphql


# how to test it?
- clone the repo
- `$ npm i`
- `$ npm start`
- in your browser write `http://localhost:5000/playground`
- write down your query, here is as example
```query
{
  getPerson(id: 1) {
    name
    mass
    gender
    height
    films {
      title
      release_date
    }
    homeworld {
      name
      rotation_period
      orbital_period
      films {
        title
        director
        producer
      }
    }
  }
}

```
you'll be able to see the outcome results on your GraphQL panel

import express from 'express'
import graphqlHTTP from 'express-graphql'
import { schema } from './data/schema'

const app = express()

app.get('/', (req, res) => {
  res.send('todo')
})

app.use(
  '/graphql',
  graphqlHTTP({
    // Asignar schema
    schema,
    graphiql: true
  })
)

app.listen(3000, () => console.log('online'))

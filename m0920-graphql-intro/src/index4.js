import { GraphQLServer } from 'graphql-yoga'

// Scalar types - String, Boolean. Int, Float, ID

// Type definitions (schema)
const typeDefs =`
    type Query {
        greeting(name: String): String!
        add(numbers: [Float!]!): Float!
        grades: [Int!]!
        me: User!
        post: Post!
    }

    type User {
        id: ID!
        name: String!
        email: String!
        age: Int
    }

    type Post {
        id: ID!
        title: String!
        body: String!
        published: Boolean!
    }
`

// Resolvers
const resolvers = {
    Query: {
        greeting(parent, args, ctx, info) {
            if(args.name){
                return `Hello, ${args.name}`
            }else{
                return 'Hello user'
            }
        },
        add(parent, args, ctx, info){
            if(args.numbers.length === 0){
                return 0
            }

            return args.numbers.reduce((acc, curr) => acc + curr)
        },
        grades(){
            return [99,80,93]
        },
        me() {
            return{
                id: '12412412',
                name: 'Koji',
                email: 'koji@ai.com'
            }
        },
        post() {
            return {
                id: '46546',
                title: 'AI for you and me',
                body: '',
                published: false
            }
        }
    }
}

const server = new GraphQLServer({
    typeDefs: typeDefs,
    resolvers: resolvers
})

server.start(() => console.log('The server is up!'))
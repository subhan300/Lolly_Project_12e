const { ApolloServer, gql } = require("apollo-server-lambda")

const faunadb = require("faunadb")
const axios = require("axios")

const q = faunadb.query

var client = new faunadb.Client({
  secret:"fnAD-FQ9J_ACAd6_b5qclStp1jttVtsuEGm2xzK1"
})

const typeDefs = gql`
  type Query {
    getAllLollies:[Lolly]

  }
  type Lolly {
    recipientName: String!
    sendersName: String!
    message: String!
    flavorTop: String!
    flavorMid: String!
    flavorBot: String!
    lollyPath: String!
  }

  type Mutation {
    createLolly(
      recipientName: String!
      sendersName: String!
      message: String!
      flavorTop: String!
      flavorMid: String!
      flavorBot: String!
      lollyPath: String!
    ): Lolly
  }


`

const resolvers = {
  Query: {
    getAllLollies:async() => {
      var result = await client.query(
        q.Map(
          q.Paginate(q.Match(q.Index("allLollies"))),
          q.Lambda(x => q.Get(x))
        )
      )

      return result.data.map(d => {
        return {
          recipientName: d.data.recipientName,
          sendersName: d.data.sendersName,
          flavorTop: d.data.flavorTop,
          flavorMid: d.data.flavorMid,
          flavorBot: d.data.flavorBot,
          message: d.data.message,
          lollyPath: d.data.lollyPath,
        }
      })
     
  
    },

    // getLollyByPath: async (_, args) => {
    //   try {
    //     var result = await client.query(
    //       q.Get(q.Match(q.Index("Lolly_by_path"), args.lollyPath))
    //     )

    //     return result.data
    //   } catch (e) {
    //     return e.toString()
    //   }
    // },
  },

  Mutation: {
    createLolly: async (root, args) => {
      console.log(args)
      const result = await client.query(
        q.Create(q.Collection("Lollies"), {
          data: args,
        })
      )

      axios
        .post("https://api.netlify.com/build_hooks/5fe8d04dee5a2ff961f7a91c")
        .then(function (response) {
          console.log(response,"show me what is a respone ghere plx")
        })
        .catch(function (error) {
          console.error(error,"show me where is error")
        })

      console.log(result)
      return result.data
      // return args
    },
  },
}

const server = new ApolloServer({
  typeDefs,
  resolvers,
})

exports.handler = server.createHandler()

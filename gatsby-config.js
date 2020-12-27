module.exports = {
  plugins: [
    {
      resolve: "gatsby-source-graphql",
      options: {
        // This type will contain remote schema Query type
        typeName: "Lollies",
        // This is the field under which it's accessible
        fieldName: "LOLLIES",
        // URL to query from
        url: "https://brave-colden-8e28fe.netlify.app/.netlify/functions/newLolly",
      },
    },

    
  ],
}
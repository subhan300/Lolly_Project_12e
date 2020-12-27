

const path = require(`path`)

exports.createPages = async ({actions,graphql}) => {
  const { data } = await graphql(`
  query MyQuery {
    LOLLIES {
      getAllLollies {
        flavorMid
        flavorBot
        message
        recipientName
        sendersName
        lollyPath
        flavorTop
      }
    }
  }
  
  
  `)

  console.log(data,"data")
  data.LOLLIES.getAllLollies.forEach((obj) => {
    actions.createPage({
      path: `lollies/${obj.lollyPath}`,
      component: path.resolve(`./src/components/dynamicLollyPage.js`),
      context: {
        ALL_DATA:obj,
      },
    })
  })



}
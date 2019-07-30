/**
 * Implement Gatsby's Node APIs in this file.
 *
 * See: https://www.gatsbyjs.org/docs/node-apis/
 */
const path = require('path')

exports.onCreateWebpackConfig = ({ actions }) => {
  actions.setWebpackConfig({
    resolve: {
      alias: {
        "@images": path.resolve(__dirname, "./src/images"),
        "@components": path.resolve(__dirname, "./src/components"),
        "@compositions": path.resolve(__dirname, "./src/compositions"),
        "@contexts": path.resolve(__dirname, "./src/contexts"),
        "@hoc": path.resolve(__dirname, "./src/hoc"),
        "@modules": path.resolve(__dirname, "./src/modules")
      }
    }
  })
}

// Implement the Gatsby API “onCreatePage”. This is
// called after every page is created.
exports.onCreatePage = async ({ page, actions }) => {
  const { createPage } = actions

  // page.matchPath is a special key that's used for matching pages
  // only on the client.
  if (page.path.match(/^\/orders/)) {
    page.matchPath = '/orders/*'

    // Update the page.
    createPage(page)
  }
}
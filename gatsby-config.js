const processGatsbySiteUrl =
  process.env.GATSBY_SITE_URL || 'https://gatsby-starter-boiler.netlify.com'
const processGatsbySiteUrlEnv = process.env.GATSBY_ENV || 'dev'

const genRobotsPolicy = env => {
  const policy = { userAgent: '*' }
  if (env === 'prod') {
    policy.allow = '/'
  } else {
    policy.disallow = '/'
  }

  return policy
}

module.exports = {
  siteMetadata: {
    title: 'Junta Educación Escuela Barrio Fatima',
    siteUrl:
      process.env.GATSBY_SITE_URL ||
      'https://gatsby-starter-boiler.netlify.com',
    description: `Kick off your next, great Gatsby project with this default starter. This barebones starter ships with the main Gatsby configuration files you might need.`,
    author: `@cazuba`
  },
  plugins: [
    `gatsby-plugin-react-helmet`,
    {
      resolve: `gatsby-source-filesystem`,
      options: {
        name: `images`,
        path: `${__dirname}/src/images`
      }
    },
    {
      resolve: `gatsby-source-filesystem`,
      options: {
        name: `data`,
        path: `${__dirname}/src/data/`,
        ignore: [`**/\.*`] // eslint-disable-line
      }
    },
    `gatsby-transformer-sharp`,
    `gatsby-plugin-sharp`,
    {
      resolve: `gatsby-plugin-manifest`,
      options: {
        name: `gatsby-starter-default`,
        short_name: `starter`,
        start_url: `/`,
        background_color: `#663399`,
        theme_color: `#663399`,
        display: `minimal-ui`,
        icon: `src/images/gatsby-icon.png` // This path is relative to the root of the site.
      }
    },
    {
      resolve: 'gatsby-plugin-robots-txt',
      options: {
        host: processGatsbySiteUrl,
        sitemap: `${processGatsbySiteUrl}/sitemap.xml`,
        policy: [genRobotsPolicy(processGatsbySiteUrlEnv)]
      }
    },
    {
      resolve: 'gatsby-plugin-material-ui',
      // If you want to use styled components you should change the injection order.
      options: {
        // stylesProvider: {
        //   injectFirst: true,
        // },
      }
    },
    // If you want to use styled components you should add the plugin here.
    // 'gatsby-plugin-styled-components',
    `gatsby-plugin-offline`,
    'gatsby-plugin-sitemap'
  ]
}

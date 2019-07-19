const processGatsbySiteUrl =
  process.env.GATSBY_SITE_URL || 'http://dev-site-staging.mysites.netlify.com'
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
    title: 'Welcome to Partner Central',
    siteUrl:
      process.env.GATSBY_SITE_URL ||
      'http://dev-site-staging.mysites.netlify.com'
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
    `gatsby-plugin-offline`,
    'gatsby-plugin-sitemap'
  ]
}

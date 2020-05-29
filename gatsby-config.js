module.exports = {
  plugins: [
    `gatsby-plugin-emotion`,
    `gatsby-transformer-sharp`,
    `gatsby-plugin-sharp`,
    {
      resolve: `gatsby-source-filesystem`,
      name: `images`,
      options: {
        path: `${__dirname}/src/images/`
      }
    },
    {
      resolve: 'gatsby-source-filesystem',
      name: 'fonts',
      options: {
        path: `${__dirname}/src/fonts/`
      }
    }
  ]
}

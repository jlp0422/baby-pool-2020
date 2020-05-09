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
    // {
    //   resolve: `gatsby-source-filesystem`,
    //   name: `backgrounds`,
    //   options: {
    //     path: `${__dirname}/src/backgrounds/`
    //   }
    // },
    {
      resolve: 'gatsby-plugin-web-font-loader',
      // options: {
      //   google: {
      //     families: ['Indie Flower']
      //   }
      // }
    }
  ]
}

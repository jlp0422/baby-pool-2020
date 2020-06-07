import React, { Fragment } from 'react'
import GlobalStyle from './GlobalStyle'
import { ContentContainer } from './Layout.styles'
import Navigation from './Navigation'

const Layout = ({ children }) => {
  return (
    <Fragment>
      <GlobalStyle />
      <Fragment>
        <Navigation />
        <ContentContainer>{children}</ContentContainer>
      </Fragment>
    </Fragment>
  )
}

export default Layout

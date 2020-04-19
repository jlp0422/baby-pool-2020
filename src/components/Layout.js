import React, { Fragment } from 'react'
import Navigation from './Navigation'
import { PageContainer, ContentContainer } from './Layout.styles'
import GlobalStyle from './GlobalStyle'

const Layout = ({ children }) => {
  return (
    <Fragment>
      <GlobalStyle />
      <PageContainer>
        <Navigation />
        <ContentContainer>{children}</ContentContainer>
      </PageContainer>
    </Fragment>
  )
}

export default Layout

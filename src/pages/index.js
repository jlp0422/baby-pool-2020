import React from 'react'
import Layout from '../components/Layout'
import Images from '../components/Images'
import { H1, StyledLink, LinkContainer } from '../shared/styles'

const Home = () => {
  return (
    <Layout>
      <H1>Welcome to the Philipson Baby Pool 2020!</H1>
      <LinkContainer>
        <StyledLink to='/entries/create'>Create an entry</StyledLink>
        <StyledLink to='/entries'>View all entries</StyledLink>
      </LinkContainer>
      <Images />
    </Layout>
  )
}

export default Home

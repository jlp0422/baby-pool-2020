import React from 'react'
import Layout from '../components/Layout'
import { H1, StyledLink, P } from '../shared/styles'

const Home = () => {
  return (
    <Layout>
      <H1>Welcome to the Philipson Baby Pool 2020!</H1>
      <StyledLink to='/entries/create'>Create an entry</StyledLink>
      <StyledLink to='/entries'>View all entries</StyledLink>
    </Layout>
  )
}

export default Home

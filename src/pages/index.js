import React from 'react'
import { Link } from 'gatsby'
import Layout from '../components/Layout'

const Home = () => {
  return (
    <Layout>
      <h1>The homepage</h1>
      <Link to='/entries/create'>Create an entry</Link>
      <Link to='/entries'>View all entries</Link>
    </Layout>
  )
}

export default Home

import React from 'react'
import { Link } from 'gatsby'

const Home = () => {
  return (
    <div>
      <h1>The homepage</h1>
      <Link to='/entries/create'>Create an entry</Link>
      <Link to='/entries'>View all entries</Link>
    </div>
  )
}

export default Home

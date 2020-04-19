import React from 'react'
import { Link } from 'gatsby'
import styled from '@emotion/styled'

const Container = styled.nav`
  width: 90vw;
  margin: 0 auto;
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  > a {
    margin: 5px auto;
    /* color: #89cff0; */
    font-weight: bold;
  }
`

const Navigation = () => {
  return (
    <Container>
      <Link to='/'>Home</Link>
      <Link to='/entries/create'>Create an entry</Link>
      <Link to='/entries'>View all entries</Link>
    </Container>
  )
}

export default Navigation

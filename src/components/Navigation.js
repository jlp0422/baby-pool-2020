import React from 'react'
import { Link } from 'gatsby'
import styled from '@emotion/styled'

const Container = styled.nav`
  margin: 0 auto;
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  background-color: #00bfff;
  padding: 0.5rem 1rem;
  > a {
    margin: 5px auto;
    color: white;
    font-weight: bold;
    text-decoration: none;
    border-bottom: 2px solid transparent;
    :hover {
      border-bottom: 2px solid hsla(195, 100%, 100%, 0.3);
    }
  }
`

const linkActiveStyle = { borderBottom: '2px solid white' }

const Navigation = () => {
  return (
    <Container>
      <Link to='/' activeStyle={linkActiveStyle}>
        Home
      </Link>
      <Link activeStyle={linkActiveStyle} to='/entries'>
        View
      </Link>
      <Link activeStyle={linkActiveStyle} to='/entries/create'>
        Create
      </Link>
    </Container>
  )
}

export default Navigation

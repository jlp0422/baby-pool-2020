import styled from '@emotion/styled'
import { Link } from 'gatsby'

export const Button = styled.button`
  border-radius: 0.25rem;
  box-sizing: border-box;
  font-size: 1.5rem;
  line-height: 2rem;
  padding: 0.5rem;
  background: #00bfff;
  border: 1px solid #00bfff;
  color: #fff;
  font-weight: bold;
  width: 125px;
  box-shadow: 1px 2px 5px #888888;
`

export const H1 = styled.h1`
  text-transform: lowercase;
  font-family: 'A Little Mixed Up';
  color: #00bfff;
  font-size: 4.4rem;
  text-align: center;
`

export const P = styled.p`
  font-size: 1.6rem;
  > a {
    text-decoration: underline;
    font-weight: bold;
    color: #00bfff;
  }
`

export const StyledLink = styled(Link)`
  text-decoration: underline;
  font-size: 1.8rem;
  font-weight: bold;
  color: #00bfff;
`

export const LinkContainer = styled.div`
  display: flex;
  justify-content: space-around;
  > * {
    margin-top: 0;
  }
`

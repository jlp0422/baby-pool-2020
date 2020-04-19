import React from 'react'
import styled from '@emotion/styled'

const Container = styled.div`
  margin: 1rem auto;
  > * {
    margin: 0 auto;
    text-align: center;
  }
  @media screen and (max-width: 640px) {
    display: block;
    margin: 1.2rem auto;
    > p:first-of-type {
      line-height: 1.6rem;
    }
  }
`

const Value = styled.p`
  font-size: 1.8rem;
`

const Label = styled.p`
  font-size: 1.4rem;
  text-transform: uppercase;
  color: #4a4a4a;
  letter-spacing: 0.1rem;
`

const GuessItem = ({ value, label }) => {
  return (
    <Container>
      <Value>{value}</Value>
      <Label>{label}</Label>
    </Container>
  )
}

export default GuessItem

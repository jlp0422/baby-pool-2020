import React from 'react'
import { calculateWeight, capitalizeWord, formatDate } from '../utils'
import styled from '@emotion/styled'
import GuessItem from './GuessItem'

const Container = styled.div`
  display: grid;
  margin-top: 0;
  grid-template-rows: 25px 1fr;
  font-size: 1.6rem;
  background-color: ${({ isBoy }) => (isBoy ? '#00bfff' : 'pink')};
  border-radius: 4px;
  border: 1px solid #444;
  padding: 8px;
  > p {
    text-align: center;
    font-weight: bold;
    font-size: 1.8rem;
  }
  @media screen and (max-width: 640px) {
    margin-top: 10px;
  }
`

const Guesses = styled.div`
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  margin-top: 0;
  align-items: center;
  @media screen and (max-width: 640px) {
    display: block;
  }
`

const Entry = ({ entry }) => {
  return (
    <Container key={entry._id} isBoy={entry.gender === 'MALE'}>
      <p>
        Entry: {entry.firstName} {entry.lastName}
      </p>
      <Guesses>
        <GuessItem value={capitalizeWord(entry.gender)} label='Gender' />
        <GuessItem value={formatDate(entry.date)} label='Birthday' />
        <GuessItem value={calculateWeight(entry.weight)} label='Weight' />
      </Guesses>
    </Container>
  )
}

export default Entry

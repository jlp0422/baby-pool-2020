import React from 'react'
import { getWeight, capitalizeWord, formatDate } from '../utils'
import styled from '@emotion/styled'
import GuessItem from './GuessItem'

const Container = styled.div`
  display: grid;
  margin-top: 10px;
  grid-template-columns: 25% 1fr;
  align-items: center;
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
    grid-template-columns: 100%;
    grid-template-rows: 25px 1fr;
  }
`

const Guesses = styled.div`
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  margin-top: 0;
  align-items: center;
`

const Entry = ({ entry }) => {
  const { pounds, ounces } = getWeight(entry.weight)
  return (
    <Container key={entry._id} isBoy={entry.gender === 'MALE'}>
      <p>
        {entry.firstName} {entry.lastName}
      </p>
      <Guesses>
        <GuessItem value={capitalizeWord(entry.gender)} label='Gender' />
        <GuessItem value={formatDate(entry.date)} label='Birthday' />
        <GuessItem
          value={
            <span>
              {pounds}&nbsp;pounds, {ounces}&nbsp;ounces
            </span>
          }
          label='Weight'
          html
        />
      </Guesses>
    </Container>
  )
}

export default Entry

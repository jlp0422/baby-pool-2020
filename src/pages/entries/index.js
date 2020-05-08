import axios from 'axios'
import React, { useEffect, useState } from 'react'
import Entry from '../../components/Entry'
import Layout from '../../components/Layout'
import Loading from '../../components/Loading'
import { Button as RawButton, H1 } from '../../shared/styles'
import { isAscending, isDate, isWeight, flipSort } from '../../utils'
import styled from '@emotion/styled'
const CancelToken = axios.CancelToken
const source = CancelToken.source()

const Button = styled(RawButton)`
  :not(:first-of-type) {
    margin-left: 10px;
    margin-top: 0;
  }
`

const Entries = () => {
  const [entries, setEntries] = useState([])
  const [isLoading, setIsLoading] = useState(true)
  const [sort, setSort] = useState('+date')
  const direction = sort.slice(0, 1)
  const property = sort.slice(1)

  useEffect(() => {
    const loadEntries = async () => {
      try {
        const response = await axios.post('/api/get-all-entries', {
          cancelToken: source.token
        })
        setEntries(response.data.entries.data)
        setIsLoading(false)
      } catch (error) {
        throw error
      }
    }
    loadEntries()

    return () => {
      source.cancel()
    }
  }, [])

  const compareFunc = (a, b) => {
    const aProp = isWeight(property) ? Number(a[property]) : a[property]
    const bProp = isWeight(property) ? Number(b[property]) : b[property]
    if (aProp < bProp) {
      return isAscending(direction) ? -1 : 1
    }
    if (aProp > bProp) {
      return isAscending(direction) ? 1 : -1
    }
    return 0
  }

  const renderArrow = () =>
    isAscending(direction) ? <span>&#x25B2;</span> : <span>&#x25BC;</span>

  const renderButton = (buttonTitle, comparison) => (
    <Button
      onClick={() =>
        setSort(comparison ? flipSort(sort) : `+${buttonTitle.toLowerCase()}`)
      }
    >
      {buttonTitle} {comparison && renderArrow()}
    </Button>
  )

  return (
    <Layout>
      <H1>All Guesses</H1>
      <div>
        {renderButton('Date', isDate(property))}
        {renderButton('Weight', isWeight(property))}
      </div>
      {isLoading && <Loading />}
      {entries.sort(compareFunc).map(entry => (
        <Entry entry={entry} key={entry._id} />
      ))}
    </Layout>
  )
}

export default Entries

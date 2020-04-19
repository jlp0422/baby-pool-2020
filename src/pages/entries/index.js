import axios from 'axios'
import React, { useEffect, useState } from 'react'
import Entry from '../../components/Entry'
import Layout from '../../components/Layout'
import Loading from '../../components/Loading'
const CancelToken = axios.CancelToken
const source = CancelToken.source()

const isAscending = direction => direction === '+'
const isDate = property => property === 'date'
const isWeight = property => property === 'weight'
const flipSort = currentSort => {
  const direction = currentSort.slice(0, 1)
  const property = currentSort.slice(1)
  const newDir = isAscending(direction) ? '-' : '+'
  return `${newDir}${property}`
}

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
    if (a[property] < b[property]) {
      return isAscending(direction) ? -1 : 1
    }
    if (a[property] > b[property]) {
      return isAscending(direction) ? 1 : -1
    }
    return 0
  }

  const arrowDirection = isAscending(direction) ? (
    <span>&#x25B2;</span>
  ) : (
    <span>&#x25BC;</span>
  )

  return (
    <Layout>
      <h1>All Guesses</h1>
      <div>
        <button
          onClick={() => setSort(isDate(property) ? flipSort(sort) : '+date')}
        >
          Date {isDate(property) && arrowDirection}
        </button>
        <button
          onClick={() =>
            setSort(isWeight(property) ? flipSort(sort) : '+weight')
          }
        >
          Weight {isWeight(property) && arrowDirection}
        </button>
      </div>
      {isLoading ? <Loading /> : null}
      {entries.sort(compareFunc).map(entry => (
        <Entry entry={entry} key={entry._id} />
      ))}
    </Layout>
  )
}

export default Entries

import axios from 'axios'
import React, { useEffect, useState } from 'react'
import Layout from '../../components/Layout'
import { calculateWeight } from '../../utils'
const CancelToken = axios.CancelToken
const source = CancelToken.source()

const Entries = () => {
  const [entries, setEntries] = useState([])
  const [isLoading, setIsLoading] = useState(true)

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

  return (
    <Layout>
      <h1>All Entries</h1>
      {isLoading ? 'Loading...' : null}
      {entries.map(entry => {
        console.log('entry', entry)
        return (
          <div key={entry._id}>
            <p>
              {entry.firstName} {entry.lastName}
            </p>
            <p>gender: {entry.gender}</p>
            <p>weight: {calculateWeight(entry.weight)}</p>
            <p>due date: {entry.date}</p>
          </div>
        )
      })}
    </Layout>
  )
}

export default Entries

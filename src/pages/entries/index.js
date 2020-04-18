import React, { useEffect, useState, Fragment } from 'react'
import axios from 'axios'
const CancelToken = axios.CancelToken
const source = CancelToken.source()

const Entries = () => {
  const [entries, setEntries] = useState([])
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    const loadEntries = async () => {
      try {
        const response = await axios.post('/api/getAllEntries', {
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
    <>
      <h1>All Entries</h1>
      {isLoading ? 'Loading...' : null}
      {entries.map(entry => {
        return (
          <Fragment key={entry._id}>
            <p>
              {entry.firstName} {entry.lastName}
            </p>
          </Fragment>
        )
      })}
    </>
  )
}

export default Entries

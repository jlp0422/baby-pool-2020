const sendQuery = require('./utils/sendQuery')

const GET_ALL_ENTRIES = `
  {
    allEntries {
      data {
        _id
        firstName
        lastName
        gender
        weight
        date
      }
    }
  }
`

exports.handler = async () => {
  const { data, errors } = await sendQuery(GET_ALL_ENTRIES)
  if (errors) {
    return {
      statusCode: 500,
      body: JSON.stringify(errors)
    }
  }

  return {
    statusCode: 200,
    body: JSON.stringify({ entries: data.allEntries })
  }
}

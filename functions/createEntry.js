const sendQuery = require('./utils/sendQuery')

const CREATE_ENTRY = `
  mutation(
    $firstName: String!
    $lastName: String!
    $email: String!
    $gender: Gender!
    $weight: String!
    $date: String!
  ) {
    createEntry(
      data: {
        firstName: $firstName
        lastName: $lastName
        email: $email
        gender: $gender
        weight: $weight
        date: $date
      }
    ) {
      _id
      firstName
      lastName
      email
      gender
      weight
      date
    }
  }
`

exports.handler = async event => {
  const params = JSON.parse(event.body)
  const { data, errors } = await sendQuery(CREATE_ENTRY, { ...params })
  if (errors) {
    return {
      statusCode: 500,
      body: JSON.stringify(errors)
    }
  }

  return {
    statusCode: 200,
    body: JSON.stringify({ newEntry: data.createEntry })
  }
}
